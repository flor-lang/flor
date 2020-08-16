import { asTree } from 'treeify'
import { Result, Node, Success } from 'parsimmon'
import SymbolTable from '../enviroment/symbol-table'

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

export const logAst = <T>(ast: Result<Node<string, T>> | Node<string, T>, simplified: boolean = false, showValues: boolean = true): void => {
  const tree = ('status' in ast && ast.status) ? ast.value : ast
  const result = simplified ? simplify(tree) : tree
  console.log(asTree(result, showValues, true))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function simplifySymbolTable<T> (ast: any): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const simplifiedAst: any = {}
  if (ast) {
    Object.entries(ast).forEach((e: [string, Success<Node<string, T>>]): void => {
      if (e[0] !== 'start' && e[0] !== 'end' && e[0] !== 'value') {
        simplifiedAst[e[0]] = e[1]
        if (typeof e[1] === 'object') simplifiedAst[e[0]] = simplifySymbolTable(simplifiedAst[e[0]])
      }
    })
  }
  return simplifiedAst
}

export const logSymbolTable = (symbolTable: SymbolTable): void => {
  const result = simplifySymbolTable(symbolTable as {})
  delete result.parent
  console.log(asTree(result, true, true))
}
