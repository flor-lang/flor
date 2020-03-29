// import { AstNode } from 'utils/traverse'

export interface LiteralNode { name: string; value: [] } // sorry, explain if you can
export interface ExpressionNode { value: { name: string; value: LiteralNode } }

export const expressionCG = (node: ExpressionNode): string => {
  const literalCG = (node: LiteralNode): string => {
    switch (node.name) {
      case 'number':
        return String(node.value)
      case 'string':
        return `"${node.value}"`
      case 'boolean':
        return String(node.value)
      case 'null':
        return 'null'
      case 'array':
        const arrayReducer = (acc: string, cur: ExpressionNode, i: number): string => {
          return `${acc}${i > 0 ? ',' : ''}${expressionCG(cur)}`
        }
        return node.value.reduce(arrayReducer, `[`) + ']'
      case 'dictionary':
        const dictReducer = (acc: string, cur: { key: { value: string | number } ; value: ExpressionNode }, i: number): string => {
          return `${acc}${i > 0 ? ',' : ''}"${String(cur.key.value)}":${expressionCG(cur.value)}`
        }
        return node.value.reduce(dictReducer, '{') + '}'
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
