// Playground code
import { Expression } from './parsers/expressions'
import { Assignment } from './parsers/assignment'
// import { logAst } from './utils/logger'
import { traverser } from './utils/traverse'

Expression.parse('(-1 / -(4 + 2)) >= 1 + 4 ou 1 + 2')

const ast = Assignment.parse('message = "Hello World!"')
// logAst(ast, true)
const visitor = {
  assignment: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enter (node: any, parent: any): void {
      console.log(`opa, entrou gostoso ${node} ${parent}`)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exit (node: any, parent: any): void {
      console.log(`ai, doeu na saída ${node} ${parent}`)
    }
  }
}
traverser(ast, visitor)
