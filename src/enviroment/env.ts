import SymbolTable from './symbol-table'

type EnvContext = 'test' | 'dev' | 'prod'
export default class Env {
  private static instance: Env

  public context: EnvContext

  public codeOutput: string

  public symbolTable: SymbolTable

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

  public clean (context: EnvContext = 'dev'): void {
    this.context = context
    this.codeOutput = ''
    this.symbolTable = new SymbolTable(null)
    this.stackMap = {
      block: []
    }
  }
}
