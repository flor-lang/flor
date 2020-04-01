import { Node } from 'parsimmon'

export type AstNode = Node<string, {}>
export type IndexedAstNode = Node<string, {}> & {[index: string]: {}};

interface EnterExitCallbacks {
  enter?(node: AstNode, parent: AstNode): void;
  between?(node: AstNode, parent: AstNode, index: number): void;
  exit?(node: AstNode, parent: AstNode): void;
}
export interface Visitor {
  [index: string]: EnterExitCallbacks;
  block?: EnterExitCallbacks;
  statement?: EnterExitCallbacks;
  assignment?: EnterExitCallbacks;
  loc?: EnterExitCallbacks;
  subscriptable?: EnterExitCallbacks;
  expression?: EnterExitCallbacks;
  bool?: EnterExitCallbacks;
  join?: EnterExitCallbacks;
  equality?: EnterExitCallbacks;
  rel?: EnterExitCallbacks;
  add?: EnterExitCallbacks;
  term?: EnterExitCallbacks;
  unary?: EnterExitCallbacks;
  factor?: EnterExitCallbacks;
  literal?: EnterExitCallbacks;
}

const isAstNode = (genericObject: {}): boolean => {
  try {
    if ((genericObject as AstNode).name) {
      return true
    }
  } catch (_) {
    return false
  }
}

export const traverser = (ast: AstNode, visitor: Visitor): void => {
  const isInVisitor = (genericObject: {}): boolean => {
    try {
      return (genericObject as AstNode).name in visitor
    } catch (_) {
      return false
    }
  }

  const traverseNode = (node: AstNode, parent: AstNode): void => {
    const methods = visitor[node.name]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    // Order is important here, don't change unless you know what you doing
    if (Array.isArray(node.value)) {
      const arrayLen = node.value.length
      node.value.forEach((child: AstNode, index: number): void => {
        if (methods && methods.between && index > 0 && index < (arrayLen - 1)) {
          methods.between(child, node, index)
        }
        traverseNode(child, node)
      })
    } else if (isAstNode(node.value) && isInVisitor(node.value)) {
      traverseNode(node.value as AstNode, node)
    } /* else if (typeof node.value === 'object') {
      const keys = Object.keys(node.value)
      keys.forEach((key): void => {
        const obj = node.value as IndexedAstNode
        const nextObj = obj[key]
        traverseNode(nextObj as AstNode, node)
      })
    } */

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast.value as AstNode, null)
}
