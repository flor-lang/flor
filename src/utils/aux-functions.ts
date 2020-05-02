import { AstNode } from '../backend/traverse'
import Env from '../enviroment/env'

export const findDuplicates = <T>(arr: T[]): T[] => arr.filter((item: T, index: number): boolean => arr.indexOf(item) !== index)

export const isEmptyNode = (node: AstNode): boolean => Array.isArray(node.value)
  ? node.value.length === 0
  : /^[ ]*$/gm.test(node.value as string)

export const indexOfChildInParent = (childNode: AstNode, parentNode: AstNode): number => {
  if (Array.isArray(parentNode.value)) {
    return (parentNode.value as AstNode[]).indexOf(childNode)
  }
  return -1
}

export const locSubscriptableIsIdentifier = (locNode: AstNode): boolean => ((locNode.value as AstNode[])[0].value as AstNode).name === 'identifier'
export const identifierValueOfLocNode = (locNode: AstNode): string => ((locNode.value as AstNode[])[0].value as AstNode).value as string
export const findIdentifierAtArgsNode = (argsNode: AstNode): [string, AstNode][] => (argsNode.value as AstNode[]).map((node: AstNode): [string, AstNode] => [node.value as string, node])
export const findClassMemberIndentifiers = (classMetaNode: AstNode): [string, AstNode][] => {
  const members: [string, AstNode][] = []
  const metaNode = classMetaNode.value as AstNode[]
  const inheritanceNode = metaNode[0]

  if (isEmptyNode(inheritanceNode) === false) {
    members.push(['super', inheritanceNode])
    const parentName = (inheritanceNode.value as AstNode).value as string
    const parentNode = Env.get().symbolTable.get(parentName)
    const metaNode = (parentNode.value as AstNode[])[1]
    members.push(...findClassMemberIndentifiers(metaNode).filter(([id]): boolean => id !== 'super'))
  }

  const propertiesNode = metaNode[2]
  const methodsNode = metaNode[4]
  const membersPush = (memberNode: AstNode): void => {
    (memberNode.value as { value: { value: string }[] }[]).forEach((memberNode): void => {
      if (memberNode.value[0].value !== 'estatico') {
        members.push([memberNode.value[1].value, (memberNode as unknown) as AstNode])
      }
    })
  }
  [propertiesNode, methodsNode].map(membersPush)

  return members
}
