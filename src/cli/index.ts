#!/usr/bin/env node
import * as Yargs from 'yargs'
import * as fs from 'fs'
import { spawn } from 'child_process'
import { createInterface } from 'readline'
import * as glob from 'glob'
import { js as beautify } from 'js-beautify'
import { Configuration, Compiler } from 'webpack';

import {
  parseCode,
  AstNode,
  SymbolTable,
  getSymbolTable,
  logAst,
  logSymbolTable,
  tryCompile
} from '../main'

interface FileContent { filePath: string; content: string; ast?: AstNode; symbolTable?: SymbolTable }

Yargs
  .scriptName('flor')
  .usage('Exemplo de uso: $0 [opção] [arquivo .flor]')
  .example('$0', 'Compila todos os arquivo flor do diretório')
  .example('$0 oi_mundo.flor', 'Compilar e Executar arquivo flor')
  .version(false)
  .help('m')
  .alias('m', 'manual')
  .epilog('Autores: Mario Matheus e Rafael Coelho.')
  .locale('pt_BR')

Yargs
  .options({
    saida: {
      describe: 'Saida do compilador',
      choices: ['js', 'ast', 'tab-sim'],
      default: 'js'
    },
    versao: {
      alias: 'v',
      type: 'boolean',
      describe: 'Versão instalada do pacote'
    },
    'criar-projeto': {
      type: 'string',
      describe: 'Cria um projeto Flor'
    },
    'executar-projeto': {
      type: 'boolean',
      describe: 'Executa o projeto definido pelo arquivo projeto.json'
    },
    'nao-exec': {
      type: 'boolean',
      describe: 'Desabilita a execução do código após compilação'
    },
    'nao-pdr': {
      type: 'boolean',
      describe: 'Desconsidera as definições da biblioteca padrão de Flor no processo de análise'
    }
  })

if (Yargs.argv.versao) {
  const pathJoin = require('path').join
  const path = pathJoin(__dirname, '..', '..', 'package.json')
  const packageJson = fs.readFileSync(path, 'utf-8')
  const version = JSON.parse(packageJson).version
  console.log(`Versão da linguagem: ${version}`)
  process.exit()
}

let files: string[] = Yargs.argv._
const rootExec = files.length === 0
if (files.length === 0) {
  files = glob.sync('**/*.flor')
}
const filesContent = files
  .map((path): FileContent => {
    try {
      const currentPath = !path.endsWith('.flor') ? path.concat('.flor') : path
      const content = fs.readFileSync(currentPath, 'utf-8')
      const processed = String(content)
      return {
        filePath: currentPath,
        content: processed
      }
    } catch (e) {
      console.log(`Não foi possível ler arquivo: ${path}`)
      process.exit(1)
    }
  })

const outputFormat = Yargs.argv.saida || 'js'
const noExec = Yargs.argv['nao-exec'] || false
const noPdr = Yargs.argv['nao-pdr'] || false
const createProject = Yargs.argv['criar-projeto'] || null

if (createProject !== null) {
  const createNewProject = (projectName: string) => {
    fs.mkdirSync(projectName.toLowerCase())
    const projectFile: { [key: string]: string }  = {
      nome: projectName,
      arquivo_inicial: 'app.flor',
      diretorio_da_saida: 'dist'
    }
    fs.writeFileSync(`${projectName.toLowerCase()}/projeto.json`, JSON.stringify(projectFile, null, 2))
    fs.writeFileSync(`${projectName.toLowerCase()}/app.flor`, `/*\nProjeto Flor: ${projectName}\n*/\n\nescrever("Olá Mundo!")\n`)
    console.log(`\nProjeto ${projectName} criado!`)
    process.exit()
  }

  const projectName = createProject as string || ''
  if (projectName.length === 0) {
    const inputInterface = createInterface({
      input: process.stdin,
      output: process.stdout
    })
    inputInterface.question('Nome do Projeto: ', function(name) {
      inputInterface.close()
      createNewProject(name)
    })
  } else {
    createNewProject(projectName)
  }
}

let project: { [key: string]: string } = {}
const haveConfig = fs.existsSync('./projeto.json')
if (haveConfig) {
  try {
    const configFile = fs.readFileSync('./projeto.json', 'utf-8')
    const configs = JSON.parse(String(configFile))
    project = configs
  } catch (e) {
    console.log(`Não foi possível ler arquivo de configuração`)
  }
}

const requireLibPath = (callbackfn: (libPath: string) => void): void => {
  const jsExec = spawn('npm', ['root', '-g'])
  createInterface({ input: jsExec.stdout }).on('line', (path: string): void => {
    callbackfn(`${path}/@flor-lang/flor/dist/lib/impl`)
  })
  createInterface({ input: jsExec.stderr }).on('line', (): void => callbackfn(''))
  jsExec.on('error', (): void => callbackfn(''))
}

const executeOutput = (filePath: string): void => {
  const args = process.argv
  args.splice(args.indexOf('--executar-projeto'), 1)
  let argIndex = args.indexOf(filePath.replace('.js', '.flor'))
  if (argIndex === -1) {
    argIndex = 0
  }
  let lastArgIndex = args.indexOf(args.find((arg, index): boolean => index > argIndex && arg.includes('.flor')))
  if (lastArgIndex === -1) {
    lastArgIndex = args.length
  }
  const jsExec = spawn('node', [filePath, ...args.slice(argIndex + 1, lastArgIndex)])
  createInterface({ input: jsExec.stdout }).on('line', console.log)
  createInterface({ input: jsExec.stderr }).on('line', console.error)
  jsExec.on('error', (error: Error): void => console.error(error.message))
  // jsExec.on('close', (code: number): void => console.info(
  //   `\n******************** Execução finalizada com ${code === 0 ? 'sucesso' : 'erros'} ********************\n`)
  // )
}

const handleOutputDirectory = (): string => {
  let outputDirectory = project['diretorio_da_saida'] || ''
  if (outputDirectory.startsWith('/')) {
    outputDirectory = outputDirectory.replace('/', '')
  }
  if (outputDirectory && !fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory)
  }
  return outputDirectory
}

const handleFileContent = (filePath: string, content: string, libPath: string): void => {
  const outputFilePath = `${filePath.substring(0, filePath.length - 4)}js`
  const pathComponents = outputFilePath.split('/')
  const pathComponent = pathComponents.slice(0, pathComponents.length - 1).join('/')
  if (pathComponent && !fs.existsSync(pathComponent)) {
    fs.mkdirSync(pathComponent)
  }
  const { success, result } = tryCompile(content, !noPdr)
  if (success) {
    const isBrowser = `(new Function("try {return this===window;}catch(e){return false;}"))()`
    const libPathRequire = !noPdr
      ? `if (typeof FlorJS === 'undefined'){require('${libPath}/standard').StandardLibJSImpl(${isBrowser} ? window : global);}`
      : ''
    const code = `try{${libPathRequire}\n${result}}catch(e){
        if (typeof FlorRuntimeErrorMessage === 'undefined') {
          console.error('Módulo de erro padrão não encontrado.')
          console.error(e)
        } else {
          console.error(FlorRuntimeErrorMessage(e))
        }
      }`
    const fileOutput = beautify(code)
    fs.writeFileSync(outputFilePath, fileOutput)
    if (!rootExec && !noExec) {
      executeOutput(outputFilePath)
    }
  } else {
    console.error(result)
  }
}

if (outputFormat === 'js') {
  requireLibPath((libPath): void => {
    const outputDirectory = handleOutputDirectory()
    filesContent.forEach(({ filePath, content }): void => {
      handleFileContent(`${outputDirectory}/${filePath}`, content, libPath)
    })
    const mainFile = project['arquivo_inicial']
    const packageProject = project['empacotar'] === 'verdadeiro' ? true : false;
    if (rootExec && mainFile) {
      const execProject = Yargs.argv['executar-projeto'] || false
      const executeProject = () => {
        if (execProject) {
          const outputDirectory = project['diretorio_da_saida'] ? project['diretorio_da_saida'] + '/' : ''
          const outputFilePath = `${outputDirectory}${mainFile.substring(0, mainFile.length - 4)}js`
          executeOutput(outputFilePath)
        }
      }
      if (packageProject) {
        let targetEnv: 'web' | 'node' = project['destino'] as 'web' | 'node'
        if (!['web', 'node'].includes(targetEnv)) {
          targetEnv = 'node'  
        }
        const options: Configuration = {
          entry: `${process.cwd()}/${outputDirectory}/${mainFile.replace('.flor', '.js')}`,
          target: targetEnv,
          devtool: 'source-map',
          output: {
            path: `${process.cwd()}/${outputDirectory}`,
            filename: `${mainFile}.js`,
          }
        }
        const webpack = require('webpack')
        const compiler: Compiler = webpack(options)
        compiler.run((err, stats) => {
          if (!err) {
            executeProject()
          }
       });
      } else {
        executeProject()
      }
    }
  })
} else if (outputFormat === 'tab-sim') {
  filesContent
    .map((file): SymbolTable => getSymbolTable(file.content, !noPdr))
    .forEach((table): void => logSymbolTable(table))
} else if (outputFormat === 'ast') {
  filesContent
    .map((file): AstNode => parseCode(file.content))
    .forEach((ast): void => logAst(ast, true))
}
