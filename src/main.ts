// Playground code
import { Expression } from './parsers/expressions'
import { Assignment } from './parsers/assignment'
import { logAst } from './utils/logger'

Expression.parse('(-1 / -(4 + 2)) >= 1 + 4 ou 1 + 2')

const ast = Assignment.parse('message = "Hello World!"')
logAst(ast, true)
