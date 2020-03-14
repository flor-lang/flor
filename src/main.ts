// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  pessoa.idade = 18 diferente de 2
`)

logAst(ast, true)
