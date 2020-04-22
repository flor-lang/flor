import { AstNode } from '../../backend/traverse'
import Env from '../../enviroment/env'
import Analyser from './analyser'

const identifierAsClassMember = (node: AstNode): void => {
  const identifierValue = node.value as string
  if (identifierValue.startsWith('#') || identifierValue === 'super') {
    if (Env.get().stackMap['classScope'].length === 0) {
      Analyser.throwError(`Operadores [#, super] não podem ser usados fora da definição de uma classe`, node)
    }
  }
}

export const evaluateIdentifierAsClassMember = Analyser.create(identifierAsClassMember)
