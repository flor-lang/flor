// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse('enquanto idade < 18 faca exibir_mensagem_censura = verdadeiro fim')
logAst(ast, true)
