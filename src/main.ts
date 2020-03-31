// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  f = funcao (x)
    retornar 2*x + 5
  fim
`)
logAst(ast, true)
