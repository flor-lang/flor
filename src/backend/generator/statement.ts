import Env from '../../enviroment/env'
// import { AstNode } from '../traverse'

export const returnCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'return '
  }
}

export const labeledArgsCodeGen = {
  enter (): void {
    Env.get().codeOutput += '('
  },
  between (): void {
    Env.get().codeOutput += ','
  },
  exit (): void {
    Env.get().codeOutput += ')'
  }
}

export const whileCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'while('
  },
  between (): void {
    Env.get().codeOutput += ')'
  }
}
