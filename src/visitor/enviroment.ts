export default class Env {
  private static instance: Env

  private constructor () {
    this.codeOutput = ''
  }

  public codeOutput: string

  public static get (): Env {
    if (!Env.instance) {
      Env.instance = new Env()
    }
    return Env.instance
  }
}
