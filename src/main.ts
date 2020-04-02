// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse('retornar nova Pessoa()')
logAst(ast, true)
