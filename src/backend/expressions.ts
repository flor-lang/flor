// import { AstNode } from './traverse'
// import Env from '../enviroment/env'
// import { indexOfChildInParent, identifierValueOfLocNode, locSubscriptableIsIdentifier } from '../utils/aux-functions'
// import { evaluateLocUse } from './semantics/definitions'
import { wrappedCodeGen, unaryCodeGen } from './generator/expressions'

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

export default {
  expression,
  wrapped,
  unary
}
