// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser } from './backend/traverse'
// import Env from './enviroment/env'
// import { logAst } from './utils/logger'

const ast = Program.tryParse(`
int = parseInt
trolando = "Troll do Troll"
definir classe Pessoa
    propriedades: nome idade
    construtor: funcao (nome, idade)
        #nome = nome
        #idade = idade
    fim
    metodos:
        descricao = () := "Nome: " + #nome + ""
fim

josiel = nova Pessoa(nome: "Josiel", idade: 14)
escrever(l: josiel)
`)

try {
  traverser(ast, visitor)
  // logAst(ast, true)
  // console.log(Env.get().symbolTable)
  // console.log(Env.get().codeOutput)
} catch (e) {
  console.error((e as Error).message)
}
