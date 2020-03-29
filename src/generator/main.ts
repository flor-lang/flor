import { traverser, AstNode, Visitor } from '../utils/traverse'
import { assignmentCG } from './assignment'

let code = ''

const visitor: Visitor = {
  assignment: {
    enter (node: AstNode, parent: AstNode): void {
      const jsString = assignmentCG(node)
      code += jsString
    },
    exit (node: AstNode, parent: AstNode): void { /* não faz nada */ }
  }
}

export const codeGenerator = (ast: AstNode): string => {
  traverser(ast, visitor)
  return code
}
