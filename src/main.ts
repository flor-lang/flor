// Playground code
import { Expression } from './parsers/expression'
import { logAst } from './utils/logger'

const ast = Expression.parse('-1 diferente de -(4 + 2)')
// const ast = Expression.parse('(-1 / -(4 + 2)) >= 1 + 4 ou 1 + 2')
logAst(ast, true)
