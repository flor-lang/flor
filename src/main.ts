// Playground code
import { Program } from './parsers/index'
import { logAst } from './utils/logger'

const ast = Program.parse('foo = "bar" // teste\n')
logAst(ast, true)
