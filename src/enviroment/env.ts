import SymbolTable from './symbol-table'

export default class Env {
  private static instance: Env

  public codeOutput: string

  public symbolTable: SymbolTable

  private constructor () {
    this.codeOutput = ''
    this.symbolTable = new SymbolTable(null)
  }

  public static get (): Env {
    if (!Env.instance) {
      Env.instance = new Env()
    }
    return Env.instance
  }
}
