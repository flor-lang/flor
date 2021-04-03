import { AstNode } from '../backend/traverse'
import { QualquerFlorType } from './symbol-type'

export default class SymbolTable {
  private table: { [key: string]: AstNode }
  private typesTable: { [key: string]: QualquerFlorType }

  protected parent: SymbolTable

  public constructor (parent: SymbolTable) {
    this.table = {}
    this.typesTable = {}
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
        return callbackfn(symbolTable)
      }
    })
  }

  public put (identifier: string, node: AstNode): void {
    this.table[identifier] = node
  }

  public putType (identifier: string, type: QualquerFlorType): void {
    this.typesTable[identifier] = type
  }

  public keys (): string[] {
    return Object.keys(this.table)
  }

  public get (identifier: string): AstNode {
    let node: AstNode = null
    this.searchIdentifier(identifier, (symbolTable): void => {
      node = symbolTable.table[identifier]
    })
    return node
  }

  public getType (identifier: string): QualquerFlorType {
    let type: QualquerFlorType = null
    this.searchIdentifier(identifier, (symbolTable): void => {
      type = symbolTable.typesTable[identifier]
    })
    return type
  }

  public rm (identifier: string): AstNode {
    let node: AstNode = null
    this.searchIdentifier(identifier, (symbolTable): void => {
      node = symbolTable.table[identifier]
      delete symbolTable.table[identifier]
      delete symbolTable.typesTable[identifier]
    })
    return node
  }

  public get depth (): number {
    let depth = 0
    this.iterateSymbolTable((): void => {
      depth += 1
    })
    return depth
  }
}
