import { AstNode } from 'utils/traverse'

interface AssignmentNode { lhs: LhsNode; rhs: AstNode }
interface LhsNode { subscriptable: AstNode; params: [] }

export const assignmentCG = (node: AstNode): string => {
  const assignmentNode = (node.value as unknown) as AssignmentNode

  const lhs = (node: LhsNode): string => {
    let lhsCode = ''
    const subscriptable = node.subscriptable as AstNode
    const subNode = subscriptable.value as AstNode

    if (subNode.name === 'identifier') {
      lhsCode += subNode.value
    } else if (subNode.name === 'function-call') {
      // TODO
    }

    // node.params.forEach(param => {
    //   // TODO
    // })

    return lhsCode
  }

  const rhs = (node: AstNode): string => {
    const expression = node.value as AstNode
    const literal = expression.value as AstNode
    // TO DO
    return literal.value as string
  }

  // console.log(assignmentNode)
  return `${lhs(assignmentNode.lhs)} = ${rhs(assignmentNode.rhs)}\\n`
}
