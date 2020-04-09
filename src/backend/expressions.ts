import { wrappedCodeGen, unaryCodeGen, blockFunctionCodeGen, argsCodeGen, inlineFunctionCodeGen } from './generator/expressions'

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
  enter (): void {
    blockFunctionCodeGen.enter()
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
