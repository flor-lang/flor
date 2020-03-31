// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse('f = (x) := 2*x + 5')
logAst(ast, true)
