// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse('para x de 0 ate 20 com passo -2 faca print = x fim')
logAst(ast, true)
