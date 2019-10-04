// Playground code
import { Bool } from './parsers/expression'
import { logAst } from './utils/logger'

// const ast = Add.parse('-1 / -(4 + 2)')
const ast = Bool.parse('1 ou 1')
logAst(ast, true)
