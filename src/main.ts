// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  swap = lista[j] + lista[j-1]
`)
logAst(ast, true)
