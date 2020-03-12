// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  programa.mensagem.imprimir() = "Olá Mundo!"
`)

logAst(ast, true)
