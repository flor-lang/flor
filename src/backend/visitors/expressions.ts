import { AstNode } from 'backend/traverse'
import Env from '../../enviroment/env'
import { insertFunctionArgumentsInSymbolTable } from '../../utils/aux-functions'
import {
  expressionCodeGen,
  wrappedCodeGen,
  unaryCodeGen,
  blockFunctionCodeGen,
  argsCodeGen,
  inlineFunctionCodeGen,
  conditionalExpressionCodeGen,
  exponentialCodeGen,
  importExpressionCodeGen
} from '../generators/expressions'
import { Polyfill } from '../../enviroment/polyfill'

const expression = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent && parent.name === 'inline-function') {
      Env.get().pushSymbolTable()
      insertFunctionArgumentsInSymbolTable(parent)
    }
    expressionCodeGen.enter(node, parent)
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent && parent.name === 'inline-function') {
      Env.get().popSymbolTable()
    }
    expressionCodeGen.exit(node, parent)
  }
}

const wrapped = {
  enter (): void {
    wrappedCodeGen.enter()
  },
  exit (): void {
    wrappedCodeGen.exit()
  }
}

const unary = {
  enter (): void {
    unaryCodeGen.enter()
  },
  exit (): void {
    unaryCodeGen.exit()
  }
}

const exponential = {
  enter (): void {
    exponentialCodeGen.enter()
  },
  exit (): void {
    exponentialCodeGen.exit()
  }
}

const blockFunction = {
  enter (node: AstNode, parent: AstNode): void {
    blockFunctionCodeGen.enter(node, parent)
  }
}

const args = {
  enter (): void {
    argsCodeGen.enter()
  },
  between (): void {
    argsCodeGen.between()
  },
  exit (node: AstNode): void {
    argsCodeGen.exit(node)
  }
}

export const inlineFunction = {
  between (node: AstNode, parent: AstNode): void {
    inlineFunctionCodeGen.between(node, parent)
  },
  exit (node: AstNode, parent: AstNode): void {
    inlineFunctionCodeGen.exit(node, parent)
  }
}

export const conditionalExpression = {
  enter (): void {
    conditionalExpressionCodeGen.enter()
  },
  between (): void {
    conditionalExpressionCodeGen.between()
  },
  exit (): void {
    conditionalExpressionCodeGen.exit()
    Env.get().injectPolyfill(Polyfill.CTD_EXPR)
  }
}

export const importExpression = {
  enter (): void {
    importExpressionCodeGen.enter()
  },
  exit (): void {
    importExpressionCodeGen.exit()
  }
}

export default {
  expression,
  wrapped,
  unary,
  exponential,
  blockFunction,
  args,
  inlineFunction,
  conditionalExpression,
  importExpression
}
