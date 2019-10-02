import { asTree } from 'treeify'
import { Result, Node, Success } from 'parsimmon'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function simplify<T> (ast: any): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const simplifiedAst: any = {}
  Object.entries(ast).forEach((e: [string, Success<Node<string, T>>]): void => {
    if (e[0] !== 'start' && e[0] !== 'end') {
      simplifiedAst[e[0]] = e[1]
      if (typeof e[1] === 'object') simplifiedAst[e[0]] = simplify(simplifiedAst[e[0]])
    }
  })
  return simplifiedAst
}

export const logAst = <T>(ast: Result<Node<string, T>>, simplified: boolean = false, showValues: boolean = true): void => {
  const result = (simplified && ast.status) ? simplify(ast.value) : ast
  console.log(asTree(result, showValues, true))
}
