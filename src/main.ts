// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  idade = ( 1 + 2 )
`)

logAst(ast, true)
