// Playground code
import { Equality } from './parsers/expression'
import { logAst } from './utils/logger'

// const ast = Add.parse('-1 / -(4 + 2)')
const ast = Equality.parse('1 != 1')
logAst(ast, true)
