import Env from '../../enviroment/env'
import { AstNode } from 'backend/traverse'
import { isEmptyNode } from '../../utils/aux-functions'
import { Polyfill } from '../../enviroment/polyfill'

export const expressionCodeGen = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent && parent.name === 'assignment') {
      Env.get().codeOutput += '__pf__.expr('
    }
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent && parent.name === 'assignment') {
      Env.get().codeOutput += ')'
      Env.get().injectPolyfill(Polyfill.EXPR)
    }
  }
}

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

export const termCodeGen = {
  enter (): void {
    Env.get().codeOutput += '__pf__.term('
  },
  between (node: AstNode , parent: AstNode, index: number): void {
    Env.get().codeOutput += index === 0 ? ",'" : "',"
  },
  exit (): void {
    Env.get().codeOutput += ')'
    Env.get().injectPolyfill(Polyfill.TERM)
  }
}

export const addCodeGen = {
  enter (): void {
    Env.get().codeOutput += '__pf__.add('
  },
  between (node: AstNode , parent: AstNode, index: number): void {
    Env.get().codeOutput += index === 0 ? ",'" : "',"
  },
  exit (): void {
    Env.get().codeOutput += ')'
    Env.get().injectPolyfill(Polyfill.ADD)
  }
}

export const exponentialCodeGen = {
  enter (): void {
    Env.get().codeOutput += '(Math.pow('
  },
  exit (): void {
    Env.get().codeOutput += '))'
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
    Env.get().codeOutput += '=null,'
  },
  exit (node: AstNode): void {
    Env.get().codeOutput += `${isEmptyNode(node) ? '' : '=null'})`
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

export const conditionalExpressionCodeGen = {
  enter (): void {
    let variable = 'null'
    if (Env.get().stackMap['LHS'].length === 2) {
      const start = Env.get().stackMap['LHS'][0] as number
      const end = Env.get().stackMap['LHS'][1] as number
      const identifier = Env.get().codeOutput.substring(start, end)
      if (Env.get().symbolTable.get(identifier)) {
        variable = identifier
      }
    }
    Env.get().codeOutput += `__pf__.cdt_expr(${variable},`
  },
  between (): void {
    Env.get().codeOutput += ','
  },
  exit (): void {
    Env.get().codeOutput += ')'
  }
}

export const importExpressionCodeGen = {
  enter (): void {
    Env.get().codeOutput += `require(`
  },
  exit (): void {
    Env.get().codeOutput += ')'
  }
}
