import { AstNode } from '../visitor/traverse'

export default class SymbolTable {
  private table: { [key: string]: AstNode }

  protected parent: SymbolTable

  public constructor (parent: SymbolTable) {
    this.table = {}
    this.parent = parent
  }

  private iterateSymbolTable (callbackfn: (symbolTable: SymbolTable) => void): void {
    for (let symbolTable = this as SymbolTable; symbolTable != null; symbolTable = symbolTable.parent) {
      callbackfn(symbolTable)
    }
  }

  private searchIdentifier (identifier: string, callbackfn: (symbolTable: SymbolTable) => void): void {
    this.iterateSymbolTable((symbolTable): void => {
      if (identifier in symbolTable.table) {
        callbackfn(symbolTable)
      }
    })
  }

  public put (identifier: string, node: AstNode): void {
    let table = this.table
    this.searchIdentifier(identifier, (symbolTable): void => {
      table = symbolTable.table
    })
    table[identifier] = node
  }

  public get (identifier: string): AstNode {
    let node: AstNode = null
    this.searchIdentifier(identifier, (symbolTable): void => {
      node = symbolTable.table[identifier]
    })
    return node
  }
}
