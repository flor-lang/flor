import { AstNode } from '../../backend/traverse'
import { locSubscriptableIsIdentifier, identifierValueOfLocNode } from '../../utils/aux-functions'
import Env from '../../enviroment/env'
import Analyser from './analyser'

const globalDeclaration = (node: AstNode): void => {
  let elemento = 'variável'
  if (node.name === 'class-declaration') {
    elemento = 'classe'
  } else if (node.name === 'interface-declaration') {
    elemento = 'interface'
  }
  if (Env.get().symbolTable.depth > 1) {
    Analyser.throwError(`Uma ${elemento} só pode ser definida globalmente`, node)
  }
}

const locUse = (node: AstNode): void => {
  if (locSubscriptableIsIdentifier(node)) {
    const identifier = identifierValueOfLocNode(node)
    if (Env.get().symbolTable.get(identifier) === null) {
      Analyser.throwError(`Váriavel '${identifier}' não foi definida`, node)
    }
  }
}

const functionCallUse = (node: AstNode): void => {
  const identifier = (node.value as AstNode[])[0].value as string
  if (Env.get().symbolTable.get(identifier) === null) {
    Analyser.throwError(`Função '${identifier}' não foi definida`, node)
  }
}

export const evaluateGlobalDeclaration = Analyser.create(globalDeclaration)
export const evaluateLocUse = Analyser.create(locUse)
export const evaluateFunctionCallUse = Analyser.create(functionCallUse)
