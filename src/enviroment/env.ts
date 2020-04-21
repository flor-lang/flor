import SymbolTable from './symbol-table'

type EnvContext = 'test' | 'dev' | 'prod'
export default class Env {
  private static instance: Env

  private saved: SymbolTable

  private _symbolTable: SymbolTable

  public context: EnvContext

  public codeOutput: string

  public stackMap: { [key: string]: string[] }

  private constructor () {
    this.clean()
  }

  public static get (): Env {
    if (!Env.instance) {
      Env.instance = new Env()
    }
    return Env.instance
  }

  public get symbolTable (): SymbolTable {
    return this._symbolTable
  }

  public pushSymbolTable (): void {
    this.saved = this._symbolTable
    this._symbolTable = new SymbolTable(this.saved)
  }

  public popSymbolTable (): void {
    this._symbolTable = this.saved
  }

  public clean (context: EnvContext = 'dev'): void {
    this.saved = null
    this.context = context
    this.codeOutput = ''
    this._symbolTable = new SymbolTable(null)
    this.stackMap = {
      block: []
    }
  }
}
