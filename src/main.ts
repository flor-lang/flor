// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  escreva(texto: "Olá Mundo!")
`)

logAst(ast, true)
