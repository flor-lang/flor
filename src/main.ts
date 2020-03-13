// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  mario = "Olá Mundo!"
`)

logAst(ast, true)
