// Playground code
import { Program } from './parsers/program'
// import { logAst } from './utils/logger'
import { traverser } from './utils/traverse'

const ast = Program.parse('message = "Hello World!"')
// logAst(ast, true)
const visitor = {
  program: {
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
