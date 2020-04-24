import Env from '../../enviroment/env'
import { AstNode } from 'backend/traverse'

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
  enter (node: AstNode, parent: AstNode): void {
    let code = ''
    if (parent.name === 'constructor') {
      code = 'constructor'
    } else if (parent.name !== 'initialize') {
      code = 'function'
    }
    Env.get().codeOutput += code
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
  between (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'initialize') {
      Env.get().codeOutput += ' => '
    } else {
      Env.get().codeOutput += '{ return '
    }
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent.name === 'initialize') {
      Env.get().codeOutput += '}'
    }
  }
}
