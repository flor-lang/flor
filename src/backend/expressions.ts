import { wrappedCodeGen, unaryCodeGen, blockFunctionCodeGen, argsCodeGen } from './generator/expressions'

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

export default {
  expression,
  wrapped,
  unary,
  blockFunction,
  args
}
