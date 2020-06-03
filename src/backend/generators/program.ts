import Env from '../../enviroment/env'

export const blockCodeGen = {
  enter (): void {
    Env.get().codeOutput += '{\n'
    if (Env.get().stackMap['superFirst'].length === 0) {
      Env.get().codeOutput += Env.get().stackMap['propDeclarations'].pop() || ''
    }
  },
  between (): void {
    Env.get().codeOutput += Env.get().stackMap['propDeclarations'].pop()
  },
  exit (): void {
    Env.get().codeOutput += '}'
  }
}
