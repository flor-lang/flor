// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  pessoa.idade = 1 * (1/2)
`)

logAst(ast, true)
