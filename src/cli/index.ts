#!/usr/bin/env node
import * as Yargs from 'yargs'
import * as fs from 'fs'
import { spawn } from 'child_process'
import { createInterface } from 'readline'
import * as glob from 'glob'
import { js as beautify } from 'js-beautify'

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

/* TODO: Config file when flor exports */
// const haveConfig = fs.existsSync('./florconfig.json')
// if (haveConfig) {
//   try {
//     const configFile = fs.readFileSync('./florconfig.json', 'utf-8')
//     const configs = JSON.parse(String(configFile))

//     if (configs.saida && !Yargs.argv.saida) outputFormat = configs.saida
//   } catch (e) {
//     console.log(`Não foi possível ler arquivo de configuração`)
//   }
// }

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

const handleFileContent = (filePath: string, content: string, libPath: string): void => {
  const outputFilePath = filePath.substring(0, filePath.length - 4) + 'js'
  const { success, result } = tryCompile(content, !noPdr)
  if (success) {
    const isBrowser = `(new Function("try {return this===window;}catch(e){return false;}"))()`
    const libPathRequire = !noPdr
      ? `if (!${isBrowser} || typeof FlorJS === 'undefined'){require('${libPath}/standard').StandardLibJSImpl(global);}`
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
    if (!noExec) {
      executeOutput(outputFilePath)
    }
  } else {
    console.error(result)
  }
}

if (outputFormat === 'js') {
  requireLibPath((libPath): void => {
    filesContent.forEach(({ filePath, content }): void => {
      handleFileContent(filePath, content, libPath)
    })
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
