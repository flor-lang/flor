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

const classInstantiation = (node: AstNode): void => {
  const identifier = (node.value as AstNode[])[0].value as string
  const classNode = Env.get().symbolTable.get(identifier)
  if (classNode === null) {
    Analyser.throwError(`Classe '${identifier}' não foi definida`, node)
  }
  if (classNode.name !== 'class-declaration') {
    Analyser.throwError(`As cláusulas [novo, nova] só podem ser usadas para instanciar classes`, node)
  }
}

export const evaluateLocUse = Analyser.create(locUse)
export const evaluateFunctionCallAsClassInstantiation = Analyser.create(classInstantiation)
