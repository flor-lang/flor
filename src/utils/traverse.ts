import { Node } from 'parsimmon'

export type AstNode = Node<string, {}>

export interface Callback { (node: AstNode, parent: AstNode): void }
export interface Visitor {
  [index: string]: {enter: Callback; exit: Callback};
}

export const traverser = (ast: AstNode, visitor: Visitor): void => {
  function traverseArray (array: AstNode[], parent: AstNode): void {
    array.forEach((child: AstNode): void => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      traverseNode(child, parent)
    })
  }

  function traverseObj (obj: AstNode, parent: AstNode): void {
    for (const node in obj) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      traverseNode(obj[node], parent)
    }
  }

  function traverseNode (node: AstNode, parent: AstNode): void {
    const methods = visitor[node.name]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.name) {
      case 'program':
        traverseNode(node.value, node)
        break

      case 'block':
        traverseArray(node.value, node)
        break

      case 'statement':
        traverseNode(node.value, node)
        break

      case 'assignment':
        traverseObj(node.value, node)
        break

      case 'loc':
        traverseObj(node.value, node)
        break

      default:
        console.log(`oloko, nó desconhecido: ${node.name}`)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast.value, null)
}
