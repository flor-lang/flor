import { AstNode } from '../../backend/traverse'
import { locSubscriptableIsIdentifier, identifierValueOfLocNode } from '../../utils/aux-functions'
import Env from '../../enviroment/env'

export const evaluateLocUse = (node: AstNode): void => {
  if (locSubscriptableIsIdentifier(node)) {
    const identifier = identifierValueOfLocNode(node)
    if (Env.get().symbolTable.get(identifier) === null) {
      throw new Error(`
      Módulo de Erro | TODO
        Váriavel '${identifier}' não foi definida
        Linha: ${node.start.line}
        Coluna: ${node.start.column}
      `)
    }
  }
}
