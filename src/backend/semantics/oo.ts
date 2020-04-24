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

export const evaluateIdentifierAsClassMember = Analyser.create(identifierAsClassMember)
export const evaluateFunctionCallAsClassInstantiation = Analyser.create(classInstantiation)
