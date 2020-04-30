// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser } from './backend/traverse'
import Env from './enviroment/env'
import { logAst } from './utils/logger'

const ast = Program.tryParse(`
definir classe Pessoa
  propriedades:
    estatico id_registro = 1
    id
    nome
  construtor: funcao ()
    #id = Pessoa.id_registro
    Pessoa.id_registro = Pessoa.id_registro + 1
  fim
  metodos:
    estatico resetar_registro = funcao ()
      Pessoa.id_registro = 1
    fim
fim
definir classe PessoaJuridica
  heranca: Pessoa
  propriedades:
    cnpj
  construtor: funcao (cnpj)
    super()
    #cnpj = cnpj
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
