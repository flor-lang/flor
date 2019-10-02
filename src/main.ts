// Playground code
import { Add } from './parsers/expression'
import { logAst } from './utils/logger'

// const ast = Add.parse('-1 / -(4 + 2)')
const ast = Add.parse('2-5')
logAst(ast, true)
