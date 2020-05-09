#!/usr/bin/env node
import * as Yargs from 'yargs'
import * as fs from 'fs'
import { spawn } from 'child_process'
import { createInterface } from 'readline'
import * as glob from 'glob'
import { js as beautify } from 'js-beautify'

import {
  StandardLibJSImpl,
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
  .example('$0 oi_mundo.flor', 'Compilar arquivo flor')
  .example('$0 --pdr-compilar', 'Compila a biblioteca padrão de flor para ser usada posteriormente')
  .example('$0 --pdr oi_mundo.flor', 'Compilar arquivo flor analisando o código junto com a biblioteca padrão')
  .example('$0 --pdr --exec oi_mundo.flor', 'Compila e Executa o arquivo flor analisando o código junto com a biblioteca padrão')
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
    exec: {
      type: 'boolean',
      describe: 'Executa o código após compilação'
    },
    pdr: {
      type: 'boolean',
      describe: 'Insere a biblioteca padrão de Flor no processo de análise'
    },
    'pdr-compilar': {
      type: 'boolean',
      describe: 'Compila a biblioteca padrão de Flor'
    }
  })

let files: string[] = Yargs.argv._
if (files.length === 0 && Yargs.argv['pdr-compilar'] !== true) {
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

if (Yargs.argv['pdr-compilar']) {
  try {
    const pathJoin = require('path').join
    const homeDir = require('os').homedir()
    const libDir = pathJoin(homeDir, '.flor', 'lib')
    const libPath = pathJoin(libDir, 'pdr.js')
    fs.mkdirSync(libDir, { recursive: true })
    fs.writeFileSync(libPath, StandardLibJSImpl)
  } catch (error) {
    console.log(error)
  }
}

const executeOutput = (filePath: string): void => {
  const jsExec = spawn('node', [filePath])
  createInterface({ input: jsExec.stdout }).on('line', console.log)
  createInterface({ input: jsExec.stderr }).on('line', console.error)
  jsExec.on('error', (error: Error): void => console.error(error.message))
  jsExec.on('close', (code: number): void => console.info(
    `\n******************** Execução finalizada com ${code === 0 ? 'sucesso' : 'erros'} ********************\n`)
  )
}

if (outputFormat === 'js') {
  filesContent.forEach(({ filePath, content }): void => {
    const outputFilePath = filePath.substring(0, filePath.length - 4) + 'js'
    const { success, result } = tryCompile(content, Yargs.argv.pdr === true)
    if (success) {
      // eslint-disable-next-line no-template-curly-in-string
      const libPath = Yargs.argv.pdr ? "require(`${require('os').homedir()}/.flor/lib/pdr`);" : ''
      const code = `${libPath}\n${result}`
      const fileOutput = beautify(code)
      fs.writeFileSync(outputFilePath, fileOutput)
      if (Yargs.argv.exec) {
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
