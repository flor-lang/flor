import SymbolTable from './symbol-table'

type EnvContext = 'test' | 'dev' | 'prod'
export default class Env {
  private static instance: Env

  private tableStack: SymbolTable[]

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
    this.tableStack.push(this._symbolTable)
    this._symbolTable = new SymbolTable(this._symbolTable)
  }

  public popSymbolTable (): void {
    this._symbolTable = this.tableStack.pop() || null
  }

  public clean (context: EnvContext = 'dev'): void {
    this.tableStack = []
    this.context = context
    this.codeOutput = ''
    this._symbolTable = new SymbolTable(null)
    this.stackMap = {
      block: [],
      classScope: [],
      staticScope: []
    }
  }
}
