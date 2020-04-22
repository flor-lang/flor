import { AstNode } from '../../backend/traverse'
import Env from '../../enviroment/env'
import Analyser from './analyser'

const identifierAsClassMember = (node: AstNode): void => {
  if (Env.get().stackMap['classScope'].length === 0) {
    Analyser.throwError(`Operador '#' não pode ser usado fora da definição de uma classe`, node)
  }
}

export const evaluateIdentifierAsClassMember = Analyser.create(identifierAsClassMember)
