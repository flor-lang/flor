import Env from '../../enviroment/env'

export const wrappedCodeGen = {
  enter (): void {
    Env.get().codeOutput += '('
  },
  exit (): void {
    Env.get().codeOutput += ')'
  }
}
