// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser } from './backend/traverse'
// import Env from './enviroment/env'
// import { logAst } from './utils/logger'

const ast = Program.tryParse(`
definir classe Pessoa
  propriedades: nome
fim
definir classe PessoaJuridica
  heranca: Pessoa
  propriedades:
    cnpj
  construtor: funcao (cnpj)
    #cnpj = cnpj
    definir classe Foo
      propriedades: bar = 0
    fim
  fim
fim
`)

try {
  traverser(ast, visitor)
  // logAst(ast, true)
  // console.log(Env.get().symbolTable)
  // console.log(Env.get().codeOutput)
} catch (e) {
  console.error((e as Error).message)
}
