// import { AstNode } from '../traverse'
// import { expressionCG, ExpressionNode } from './expressions'

// interface AssignmentNode { lhs: LhsNode; rhs: RhsNode }
// interface LhsNode { subscriptable: { value: AstNode }; params: [] }
// interface RhsNode { value: {} }

// export const assignmentCG = (node: AstNode): string => {
//   const assignmentNode = (node.value as unknown) as AssignmentNode

//   const lhs = (node: LhsNode): string => {
//     let lhsCode = ''
//     const subscriptable = node.subscriptable
//     const subNode = subscriptable.value

//     if (subNode.name === 'identifier') {
//       lhsCode += subNode.value
//     } else if (subNode.name === 'function-call') {
//       // const identifier = subNode.value.identifier
//       // lhsCode += identifier + '('
//       // const args = subNode.value['labeled-args']
//       // args.forEach(a => {
//       //   lhsCode += a
//       // })
//     }

//     // node.params.forEach(param => {
//     //   // TODO
//     // })

//     return lhsCode
//   }

//   const rhs = (node: RhsNode): string => {
//     return expressionCG(node as ExpressionNode)
//   }

//   return `${lhs(assignmentNode.lhs)} = ${rhs(assignmentNode.rhs)}\\n`
// }

import Env from '../../enviroment/env'
import { AstNode } from '../traverse'

export const assignmentCodeGen = {
  between (): void {
    Env.get().codeOutput += ' = '
  },
  exit (): void {
    Env.get().codeOutput += '\\n'
  }
}

export const identifierCodeGen = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}
