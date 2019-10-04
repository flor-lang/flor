// Playground code
import { Expression } from './parsers/expression'
import { Loc, Assignment } from './parsers/assignment'
import { logAst } from './utils/logger'

const ast = Assignment.parse('lascou = 5')
// const ast = Loc.parse('array[0]')
// const ast = Expression.parse('-one diferente de -(four + 2)')
// const ast = Expression.parse('(-1 / -(4 + 2)) >= 1 + 4 ou 1 + 2')
logAst(ast, true)
