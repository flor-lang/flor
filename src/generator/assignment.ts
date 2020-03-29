import { AstNode } from 'utils/traverse'

interface AssignmentNode { lhs: LhsNode; rhs: RhsNode }
interface LhsNode { subscriptable: { value: AstNode }; params: [] }
interface RhsNode { value: {} }

export const assignmentCG = (node: AstNode): string => {
  const assignmentNode = (node.value as unknown) as AssignmentNode

  const lhs = (node: LhsNode): string => {
    let lhsCode = ''
    const subscriptable = node.subscriptable
    const subNode = subscriptable.value

    if (subNode.name === 'identifier') {
      lhsCode += subNode.value
    } else if (subNode.name === 'function-call') {
      // const identifier = subNode.value.identifier
      // lhsCode += identifier + '('
      // const args = subNode.value['labeled-args']
      // args.forEach(a => {
      //   lhsCode += a
      // })
    }

    // node.params.forEach(param => {
    //   // TODO
    // })

    return lhsCode
  }

  const rhs = (node: RhsNode): string => {
    const expression = node.value as AstNode
    const literal = expression.value as AstNode
    // TO DO
    return literal.value as string
  }

  // console.log(assignmentNode)
  return `${lhs(assignmentNode.lhs)} = ${rhs(assignmentNode.rhs)}\\n`
}
