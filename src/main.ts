// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse('para cada elemento de colecao faca soma=soma+elemento fim')
logAst(ast, true)
