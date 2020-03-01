// Playground code
import { Program } from './parsers/program'

// import { logAst } from './utils/logger'
// const ast = Program.parse(`
//   para i de 0 ate tamanho_lista - 1 faca
//     para j de 1 ate tamanho_lista - 1 faca
//       se lista[j] < lista[j-1] entao
//         aux = lista[j-1]
//         lista[j-1] = lista[j]
//         lista[j] = aux
//       fim
//     fim
//   fim
//   `)
// logAst(ast, true, true)

import * as T from './utils/traverse'
const ast = Program.tryParse(`
  para i de 0 ate tamanho_lista - 1 faca
    para j de 1 ate tamanho_lista - 1 faca
      se lista[j] < lista[j-1] entao
        aux = lista[j-1]
        lista[j-1] = lista[j]
        lista[j] = aux
      fim
    fim
  fim
  `)
const visitor = {
  program: {
    enter (node: T.AstNode, parent: T.AstNode): void {
      console.log(`opa, entrou gostoso ${node} ${parent}`)
    },
    exit (node: T.AstNode, parent: T.AstNode): void {
      console.log(`ai, doeu na saída ${node} ${parent}`)
    }
  }
}
T.traverser(ast, visitor)
