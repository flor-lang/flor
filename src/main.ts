// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(
  `
  x = {
    "nome": "Sandro Meira Ricci",
    "profissao": "Comentarista de Arbitragem"
  }
  `
)
logAst(ast, true)
