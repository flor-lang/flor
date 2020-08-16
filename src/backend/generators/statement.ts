import Env from '../../enviroment/env'
import { AstNode } from '../traverse'
import { isEmptyNode } from '../../utils/aux-functions'

export const returnCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'return '
  }
}

export const iterationBreakerCodeGen = {
  enter (node: AstNode): void {
    if (node.value === 'pular_iteracao') {
      Env.get().codeOutput += 'continue;'
    }
    if (node.value === 'interromper_laco') {
      Env.get().codeOutput += 'break;'
    }
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
    Env.get().codeOutput += ')\n'
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

export const doWhileCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'do'
  },
  between (): void {
    Env.get().codeOutput += 'while('
  },
  exit (): void {
    Env.get().codeOutput += ')'
  }
}

export const forEachCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'for(const '
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    if (index === 0) {
      Env.get().codeOutput += ' of '
    }
    if (index === 1) {
      Env.get().codeOutput += ')'
    }
  }
}

export const ifThenElseCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'if('
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    const elseNode = (node.value as AstNode[])[3]
    if (index === 0) {
      Env.get().codeOutput += ')'
    }
    if (index === 2 && isEmptyNode(elseNode) === false) {
      Env.get().codeOutput += 'else'
    }
  }
}

export const elifCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'else if('
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    if (index === 0) {
      Env.get().codeOutput += ')'
    }
  }
}
