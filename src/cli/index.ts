#!/usr/bin/env node
import * as Yargs from 'yargs'
import * as fs from 'fs'
import { spawn } from 'child_process'
import { createInterface } from 'readline'
import * as glob from 'glob'
import { js as beautify } from 'js-beautify'

import {
  StandardLibJSImpl,
  FlorRuntimeErrorMessage,
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
  .example('$0 --pdr-compilar', 'Compila a biblioteca padrão de flor para ser usada posteriormente')
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
    },
    'pdr-compilar': {
      type: 'boolean',
      describe: 'Compila a biblioteca padrão de Flor'
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

if (Yargs.argv['pdr-compilar']) {
  try {
    const pathJoin = require('path').join
    const homeDir = require('os').homedir()
    const libDir = pathJoin(homeDir, '.flor', 'lib')
    const libPath = pathJoin(libDir, 'pdr.js')
    const ErrorHandler = `_.FlorRuntimeErrorMessage = ${FlorRuntimeErrorMessage.toString()}`
    const StdLib = StandardLibJSImpl.toString().replace('function () {', '').slice(0, -1)
    fs.mkdirSync(libDir, { recursive: true })
    fs.writeFileSync(libPath, beautify(`${StdLib}\n${ErrorHandler}\n`))
    console.log('Biblioteca padrão compilada com sucesso! :)')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

let files: string[] = Yargs.argv._
if (files.length === 0) {
  files = glob.sync('**/*.flor')
}
const filesContent = files
  .map((path): FileContent => {
    try {
      const content = fs.readFileSync(path, 'utf-8')
      const processed = String(content)
      return {
        filePath: path,
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

const executeOutput = (filePath: string): void => {
  const jsExec = spawn('node', [filePath])
  createInterface({ input: jsExec.stdout }).on('line', console.log)
  createInterface({ input: jsExec.stderr }).on('line', console.error)
  jsExec.on('error', (error: Error): void => console.error(error.message))
  // jsExec.on('close', (code: number): void => console.info(
  //   `\n******************** Execução finalizada com ${code === 0 ? 'sucesso' : 'erros'} ********************\n`)
  // )
}

if (outputFormat === 'js') {
  filesContent.forEach(({ filePath, content }): void => {
    const outputFilePath = filePath.substring(0, filePath.length - 4) + 'js'
    const { success, result } = tryCompile(content, !noPdr)
    if (success) {
      // eslint-disable-next-line no-template-curly-in-string
      const libPath = !noPdr ? "require(`${require('os').homedir()}/.flor/lib/pdr`);" : ''
      const code = `try{${libPath}\n${result}}catch(e){
        if (typeof FlorRuntimeErrorMessage === 'undefined') {
          console.error(
            'Módulo padrão não encontrado. Por favor, compile a biblioteca padrão!' + 
            ' Execute o comando:\\n  flor --pdr-compilar'
          )
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
  })
} else if (outputFormat === 'tab-sim') {
  filesContent
    .map((file): SymbolTable => getSymbolTable(file.content, Yargs.argv.pdr === true))
    .forEach((table): void => logSymbolTable(table))
} else if (outputFormat === 'ast') {
  filesContent
    .map((file): AstNode => parseCode(file.content))
    .forEach((ast): void => logAst(ast, true))
}
