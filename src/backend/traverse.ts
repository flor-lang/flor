import { Node } from 'parsimmon'
import { camelCase } from 'lodash'

export type AstNode = Node<string, {}>
export type IndexedAstNode = Node<string, {}> & {[index: string]: {}};

interface EnterExitCallbacks {
  enter?(node?: AstNode, parent?: AstNode): void;
  between?(node?: AstNode, parent?: AstNode, index?: number): void;
  exit?(node?: AstNode, parent?: AstNode): void;
}
export interface Visitor {
  [index: string]: EnterExitCallbacks;
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
  const traverseNode = (node: AstNode, parent: AstNode): void => {
    const methods = visitor[camelCase(node.name)]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    // Order is important here, don't change unless you know what you doing
    if (Array.isArray(node.value)) {
      const arrayLen = node.value.length
      node.value.forEach((child: AstNode, index: number): void => {
        traverseNode(child, node)
        if (methods && methods.between && arrayLen > 1 && index < (arrayLen - 1)) {
          methods.between(node, parent, index)
        }
      })
    } else if (isAstNode(node.value)) {
      traverseNode(node.value as AstNode, node)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast as AstNode, null)
}
