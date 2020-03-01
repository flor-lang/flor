import { Node } from 'parsimmon'

export type AstNode = Node<string, {}>
export type IndexedAstNode = Node<string, {}> & {[index: string]: {}};

interface EnterExitCallbacks {
  enter(node: AstNode, parent: AstNode): void;
  exit(node: AstNode, parent: AstNode): void;
}
interface Visitor {
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

const isAstNode = (genericObject: {}, parentName: string): boolean => {
  try {
    if ((genericObject as AstNode).name) {
      return true
    }
  } catch (e) {
    console.log(`not default node type in vale of ${parentName}`)
  }
  return false
}

export const traverser = (ast: AstNode, visitor: Visitor): void => {
  const traverseNode = (node: AstNode, parent: AstNode): void => {
    const methods = visitor[node.name]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    // Order is important here, don't change unless you know what you doing
    if (Array.isArray(node.value)) {
      node.value.forEach((child: AstNode): void => {
        traverseNode(child, node)
      })
    } else if (isAstNode(node.value, parent.name)) {
      traverseNode(node.value as AstNode, node)
    } else if (typeof node.value === 'object') {
      const keys = Object.keys(node.value)
      keys.forEach((key): void => {
        const obj = node.value as IndexedAstNode
        const nextObj = obj[key]
        traverseNode(nextObj as AstNode, node)
      })
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast.value as AstNode, null)
}
