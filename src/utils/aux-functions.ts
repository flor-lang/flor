import { AstNode } from '../backend/traverse'

export const findDuplicates = <T>(arr: T[]): T[] => arr.filter((item: T, index: number): boolean => arr.indexOf(item) !== index)

export const isEmptyNode = (node: AstNode): boolean => /^[ ]*$/gm.test(node.value as string)

export const indexOfChildInParent = (childNode: AstNode, parentNode: AstNode): number => {
  if (Array.isArray(parentNode.value)) {
    return (parentNode.value as AstNode[]).indexOf(childNode)
  }
  return -1
}

export const locSubscriptableIsIdentifier = (locNode: AstNode): boolean => ((locNode.value as AstNode[])[0].value as AstNode).name === 'identifier'
export const identifierValueOfLocNode = (locNode: AstNode): string => ((locNode.value as AstNode[])[0].value as AstNode).value as string
