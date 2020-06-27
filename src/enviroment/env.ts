import SymbolTable from './symbol-table'
import { Polyfill, PolyfillDependenciesMap } from './polyfill'

type EnvContext = 'test' | 'dev' | 'prod'

export default class Env {
  private static instance: Env

  private polyfills: Polyfill[]

  private tableStack: SymbolTable[]

  private _symbolTable: SymbolTable

  public context: EnvContext

  public codeOutput: string

  public stackMap: { [key: string]: (string | number)[] }

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

  public getCodeOutputPolyfilled (): string {
    let output = this.codeOutput
    this.polyfills.forEach((polyfill: Polyfill): void => {
      output = `${polyfill}\n${output}`
    })
    return output
  }

  public injectPolyfill (polyfill: Polyfill): void {
    if (this.polyfills.includes(polyfill) === false) {
      this.polyfills.push(polyfill)
      this.injectPolyfillDependencies(polyfill)
    }
  }

  // FIXME: Provisional Method
  // TODO: Injection by Tree Dependency
  private injectPolyfillDependencies (polyfill: Polyfill): void {
    PolyfillDependenciesMap
      .find(([polyfillKey]): boolean => polyfillKey === polyfill)[1]
      .forEach((dependency: Polyfill): void => this.injectPolyfill(dependency))
  }

  public clean (context: EnvContext = 'dev'): void {
    this.context = context
    this.codeOutput = ''
    this.polyfills = []
    if (context !== 'test') {
      this.tableStack = []
      this._symbolTable = new SymbolTable(null)
      this.stackMap = {
        LHS: [],
        PROP_DECLARATIONS: [],
        SUPER_FIRST: [],
        CLASS_SCOPE: [],
        STATIC_SCOPE: [],
        FUNCTION_NAME: [],
        CURRENT_BLOCK_PARENT: [],
        ITERATION_BREAKER_BLOCK: []
      }
    }
  }
}
