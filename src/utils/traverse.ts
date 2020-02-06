// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const traverser = (ast: any, visitor: any): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverseNode (node: any, parent: any): void {
    const methods = visitor[node.name]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.name) {
      case 'assignment':
        console.log('Encontrei um assignment')
        console.log(node.value)
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
