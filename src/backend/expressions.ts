import { wrappedCodeGen, unaryCodeGen, blockFunctionCodeGen, argsCodeGen, inlineFunctionCodeGen } from './generator/expressions'
import { AstNode } from 'backend/traverse'

const expression = {
  enter (): void {},
  between (): void {},
  exit (): void {}
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
  exit (): void {
    argsCodeGen.exit()
  }
}

export const inlineFunction = {
  between (): void {
    inlineFunctionCodeGen.between()
  }
}

export default {
  expression,
  wrapped,
  unary,
  blockFunction,
  args,
  inlineFunction
}
