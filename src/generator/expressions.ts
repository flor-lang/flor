// import { AstNode } from 'utils/traverse'

// export interface NumberNode { name: string; value: number }
export interface LiteralNode { name: string; value: {} }
export interface ExpressionNode { value: { name: string; value: LiteralNode } }

export const expressionCG = (node: ExpressionNode): string => {
  const literalCG = (node: LiteralNode): string => {
    console.log(node.name)
    switch (node.name) {
      case 'number':
        return String(node.value)
      case 'string':
        return `"${node.value}"`
      case 'boolean':
        return String(node.value)
    }
  }

  const internalNode = node.value

  switch (internalNode.name) {
    case 'literal':
      return literalCG(internalNode.value)
    default:
      return ''
  }
}
