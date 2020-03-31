// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  lista[j-1] = 0
  lista = j-1
`)
logAst(ast, true)
