// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`x = 1 * -obter()`)
logAst(ast, true)
