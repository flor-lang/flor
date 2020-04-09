import Env from '../../enviroment/env'

export const wrappedCodeGen = {
  enter (): void {
    Env.get().codeOutput += '('
  },
  exit (): void {
    Env.get().codeOutput += ')'
  }
}

export const unaryCodeGen = {
  enter (): void {
    Env.get().codeOutput += '('
  },
  exit (): void {
    Env.get().codeOutput += ')'
  }
}

export const blockFunctionCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'function'
  }
}

export const argsCodeGen = {
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

export const inlineFunctionCodeGen = {
  between (): void {
    Env.get().codeOutput += ' => '
  }
}
