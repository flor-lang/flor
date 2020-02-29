// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const traverser = (ast: any, visitor: any): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverseArray (array: any, parent: any): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    array.forEach((child: any): void => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      traverseNode(child, parent)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverseObj (obj: any, parent: any): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const node in obj) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      traverseNode(obj[node], parent)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverseNode (node: any, parent: any): void {
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
