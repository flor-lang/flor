// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  se teste entao
    teste()
  senao se !teste entao
    troll()
  senao se eita entao
    eita()
  senao
    troll()
  fim
`)
logAst(ast, true)
