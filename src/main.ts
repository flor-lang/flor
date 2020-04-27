// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser } from './backend/traverse'
import Env from './enviroment/env'
import { logAst } from './utils/logger'

const ast = Program.tryParse(`
definir classe Foo
  propriedades: variavel_teste
  construtor: funcao ()
    #variavel_teste = 0
  fim
  metodos: f = (x,y) := x + y
fim

definir classe Bar
  heranca: Foo
  propriedades: random
  construtor: funcao ()
    super()
    #random = 0
  fim
fim
`)

try {
  traverser(ast, visitor)
  logAst(ast, true)
  // console.log(Env.get().symbolTable)
  console.log(Env.get().codeOutput)
} catch (e) {
  console.error((e as Error).message)
}
