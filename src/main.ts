// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  faca
    v[i] = v[i+1]
  enquanto i < a_tamanho - 1
  fim
`)
logAst(ast, true)
