// import { AstNode } from './traverse'
// import Env from '../enviroment/env'
// import { indexOfChildInParent, identifierValueOfLocNode, locSubscriptableIsIdentifier } from '../utils/aux-functions'
// import { evaluateLocUse } from './semantics/definitions'
import { wrappedCodeGen } from './generator/expressions'

const expression = {
  enter (): void {},
  between (): void {},
  exit (): void {}
}

const wrapped = {
  enter (): void {
    wrappedCodeGen.enter()
  },
  between (): void {},
  exit (): void {
    wrappedCodeGen.exit()
  }
}

export default {
  expression,
  wrapped
}
