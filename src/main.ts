// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse('x = 0 igual a 3')
logAst(ast, true)
