import { AstNode } from '../../backend/traverse'
import { locSubscriptableIsIdentifier, identifierValueOfLocNode } from '../../utils/aux-functions'
import Env from '../../enviroment/env'
import Analyser from './analyser'

const locUse = (node: AstNode): void => {
  if (locSubscriptableIsIdentifier(node)) {
    const identifier = identifierValueOfLocNode(node)
    if (Env.get().symbolTable.get(identifier) === null) {
      Analyser.throwError(`Váriavel '${identifier}' não foi definida`, node)
    }
  }
}

export const evaluateLocUse = Analyser.create(locUse)
