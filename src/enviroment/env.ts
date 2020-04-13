import SymbolTable from './symbol-table'

export default class Env {
  private static instance: Env

  public context: 'test' | 'dev' | 'prod'

  public codeOutput: string

  public symbolTable: SymbolTable

  public stackMap: { [key: string]: string[] }

  private constructor () {
    this.context = 'dev'
    this.codeOutput = ''
    this.symbolTable = new SymbolTable(null)
    this.stackMap = {
      block: []
    }
  }

  public static get (): Env {
    if (!Env.instance) {
      Env.instance = new Env()
    }
    return Env.instance
  }
}
