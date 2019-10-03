// Playground code
import { Join } from './parsers/expression'
import { logAst } from './utils/logger'

// const ast = Add.parse('-1 / -(4 + 2)')
const ast = Join.parse('1 e 1')
logAst(ast, true)
