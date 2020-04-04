import { AstNode } from '../visitor/traverse'

export default class SymbolTable {
  private table: { [key: string]: AstNode }

  protected parent: SymbolTable

  public constructor (parent: SymbolTable) {
    this.table = {}
    this.parent = parent
  }

  public put (identifier: string, node: AstNode): void {
    this.table[identifier] = node
  }

  public get (identifier: string): AstNode {
    for (let symbolTable = this as SymbolTable; symbolTable != null; symbolTable = symbolTable.parent) {
      if (identifier in symbolTable.table) {
        return symbolTable.table[identifier]
      }
    }
    return null
  }
}
