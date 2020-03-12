// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  mario.programar().codigo = "Olá Mundo!"
`)

logAst(ast, true)
