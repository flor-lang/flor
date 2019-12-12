#!/usr/bin/env node
import * as Yargs from 'yargs'
import * as fs from 'fs'
import * as glob from 'glob'

import comments from '../utils/comments'
import { Program } from '../parsers/program'
import { logAst } from '../utils/logger'
import { Result, Node } from 'parsimmon'

Yargs
  .scriptName('tinp')
  .usage('Exemplo de uso: $0 [opção] [arquivo .tinp]')
  .example('$0 oi_mundo.tinp', '')
  .version(false)
  .help('m')
  .alias('m', 'manual')
  .epilog('Autores: Mario Matheus e Rafael Coelho.')
  .locale('pt_BR')

Yargs
  .options({
    saida: {
      default: 'js',
      describe: 'saida do compilador',
      choices: ['js', 'ast']
    }
  })

const files = Yargs.argv._[0] ? [Yargs.argv._[0]] : glob.sync('**/*.tinp')
const filesContent = files
  .map((path): string => {
    try {
      const content = fs.readFileSync(path, 'utf-8')
      const processed = comments.remove(String(content))
      return processed
    } catch (e) {
      console.log(`Não foi possível ler arquivo: ${path}`)
      process.exit(1)
    }
  })

if (Yargs.argv.saida === 'js') {
  console.log('Ainda não implementado :(')
} else if (Yargs.argv.saida === 'tab-sim') {
  console.log('Ainda não implementado')
} else if (Yargs.argv.saida === 'ast') {
  const parse =
    (content: string): Result<Node<'program', {}>> => Program.parse(content)

  const asts = filesContent.map(parse)
  asts.forEach((ast): void => logAst(ast, true))
}
