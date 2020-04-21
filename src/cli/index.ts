#!/usr/bin/env node
import * as Yargs from 'yargs'
import * as fs from 'fs'
import * as vm from 'vm'
import * as glob from 'glob'
import { js as beautify } from 'js-beautify'

import comments from '../utils/comments'
import { Program } from '../parsers/program'
import { logAst } from '../utils/logger'
import { Node } from 'parsimmon'
import { traverser } from '../backend/traverse'
import { visitor } from '../backend/visitor'
import Env from '../enviroment/env'
import { Standard } from '../lib/standard'

interface FileContent {filePath: string; content: string; ast?: Node<'program', {}>}

Yargs
  .scriptName('flor')
  .usage('Exemplo de uso: $0 [opção] [arquivo .flor]')
  .example('$0 oi_mundo.flor', '')
  .version(false)
  .help('m')
  .alias('m', 'manual')
  .epilog('Autores: Mario Matheus e Rafael Coelho.')
  .locale('pt_BR')

Yargs
  .options({
    saida: {
      describe: 'Saida do compilador',
      choices: ['js', 'ast']
    },
    exec: {
      type: 'boolean',
      describe: 'Executa o código após compilação'
    }
  })

const files = Yargs.argv._.length !== 0 ? Yargs.argv._ : glob.sync('**/*.flor')
const filesContent = files
  .map((path): FileContent => {
    try {
      const content = fs.readFileSync(path, 'utf-8')
      const processed = comments.remove(String(content))
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

if (outputFormat === 'js') {
  const parse = (file: FileContent): FileContent => {
    const ast = Program.tryParse(file.content)
    return { ...file, ast }
  }

  const filesParsed = filesContent.map(parse)
  filesParsed.forEach(({ filePath, ast }): void => {
    const outputFilePath = filePath.substring(0, filePath.length - 4) + 'js'
    traverser(ast, visitor)
    try {
      const fileOutput = beautify(Env.get().codeOutput)
      fs.writeFileSync(outputFilePath, fileOutput)
      if (Yargs.argv.exec) {
        const script = new vm.Script(fileOutput)
        const context = { console: console, ...Standard }
        script.runInNewContext(context)
      }
    } catch (error) {
      console.error(error)
    } finally {
      Env.get().clean()
    }
  })
} else if (outputFormat === 'tab-sim') {
  console.log('Ainda não implementado')
} else if (outputFormat === 'ast') {
  const parse = (file: FileContent): FileContent => {
    const ast = Program.tryParse(file.content)
    return { ...file, ast }
  }

  const fileParsed = filesContent.map(parse)
  fileParsed.forEach(({ ast }): void => logAst(ast, true))
}
