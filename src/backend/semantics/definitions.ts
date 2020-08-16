import { AstNode } from '../../backend/traverse'
import { locSubscriptableIsIdentifier, identifierValueOfLocNode, locNodeHasEmptyParams } from '../../utils/aux-functions'
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
    Analyser.throwError(`Uma ${elemento} só pode ser definida globalmente.`, node)
  }
}

const privatePropertyAccess = (node: AstNode): void => {
  if (locNodeHasEmptyParams(node) === false) {
    const params = (node.value as AstNode[])[1]
    const existsPrivateAccess = (params.value as AstNode[])
      .filter((p): boolean => p.name === 'objectable')
      .map((o): {} => (o.value as AstNode).value)
      .some((id): boolean => {
        let identifier: string = id as string
        if (Array.isArray(id)) {
          identifier = (id as AstNode[])[0].value as string
        }
        return identifier.startsWith('_')
      })
    if (existsPrivateAccess) {
      Analyser.throwError(`Variáveis privadas (iniciadas com '_') não podem ser acessadas fora de suas respectivas classes.`, node)
    }
  }
}

const locUse = (node: AstNode): void => {
  if (locSubscriptableIsIdentifier(node)) {
    const identifier = identifierValueOfLocNode(node)
    if (Env.get().symbolTable.get(identifier) === null) {
      Analyser.throwError(`Váriavel '${identifier}' não foi definida.`, node)
    }
  }
}

const functionCallUse = (node: AstNode): void => {
  const identifier = (node.value as AstNode[])[0].value as string
  if (Env.get().symbolTable.get(identifier) === null) {
    Analyser.throwError(`Função '${identifier}' não foi definida.`, node)
  }
}

const iterationBreakerUse = (node: AstNode): void => {
  const last = Env.get().stackMap['ITERATION_BREAKER_BLOCK'].length - 1
  const breakerBlock = Env.get().stackMap['ITERATION_BREAKER_BLOCK'][last] as string
  if (breakerBlock !== 'LOOP') {
    Analyser.throwError(`Os alteradores [pular_iteracao, interromper_laco] só podem ser utilizados dentro de laços.`, node)
  }
}

export const evaluateGlobalDeclaration = Analyser.create(globalDeclaration)
export const evaluatePrivatePropertyAccessAtLocNode = Analyser.create(privatePropertyAccess)
export const evaluateLocUse = Analyser.create(locUse)
export const evaluateFunctionCallUse = Analyser.create(functionCallUse)
export const evaluateIterationBreakerUse = Analyser.create(iterationBreakerUse)
