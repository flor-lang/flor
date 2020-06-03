import Env from '../../enviroment/env'

export const blockCodeGen = {
  enter (): void {
    Env.get().codeOutput += '{\n'
    if (Env.get().stackMap['SUPER_FIRST'].length === 0) {
      Env.get().codeOutput += Env.get().stackMap['PROP_DECLARATIONS'].pop() || ''
    }
  },
  between (): void {
    Env.get().codeOutput += Env.get().stackMap['PROP_DECLARATIONS'].pop()
  },
  exit (): void {
    Env.get().codeOutput += '}'
  }
}
