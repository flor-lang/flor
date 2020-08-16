import { AstNode } from '../../backend/traverse'
import Env from '../../enviroment/env'
import Analyser from './analyser'

const identifierAsClassMember = (node: AstNode): void => {
  const identifierValue = node.value as string
  if (identifierValue.startsWith('#') || identifierValue === 'super') {
    if (Env.get().stackMap['CLASS_SCOPE'].length === 0) {
      Analyser.throwError(`Operadores [#, super] não podem ser usados fora da definição de uma classe.`, node)
    } else if (Env.get().stackMap['STATIC_SCOPE'].length > 0) {
      Analyser.throwError(`Membros [#, super] não podem ser usados dentro de um método estático.`, node)
    }
  }
}

const classInstantiation = (node: AstNode): void => {
  const identifier = (node.value as AstNode[])[0].value as string
  const classNode = Env.get().symbolTable.get(identifier)
  if (classNode === null) {
    Analyser.throwError(`Classe '${identifier}' não foi definida.`, node)
  }
  // FIXME: To after type check
  // if (classNode.name !== 'class-declaration') {
  //   Analyser.throwError(`As cláusulas [novo, nova] só podem ser usadas para instanciar classes`, node)
  // }
}

const interfaceUse = (node: AstNode): void => {
  const identifier = node.value as string
  const interfaceNode = Env.get().symbolTable.get(identifier)
  if (interfaceNode === null) {
    Analyser.throwError(`Interface '${identifier}' não foi definida.`, node)
  }
  // TODO: Check if interface after type check
}

const superCallAtConstructorSubclass = (node: AstNode): void => {
  try {
    const block = ((node.value as AstNode).value as AstNode[])[1]
    const firstStmt = (block.value as AstNode[])[0]
    const stmtValue = firstStmt.value as AstNode
    if (stmtValue.name !== 'function-call' || (stmtValue.value as AstNode[])[0].value !== 'super') {
      throw new Error()
    }
  } catch (e) {
    // TODO:? Detectar acesso a variaveis membros das classes para posicionamento do super(...)
    Analyser.throwError(`Em construtores de subclasses, 'super(...)' deve ser chamado no início da função.`, node)
  }
}

const inheritanceParent = (node: AstNode): void => {
  const parentIdentifier = (node.value as AstNode).value as string
  const parentNode = Env.get().symbolTable.get(parentIdentifier)
  if (parentNode === null) {
    Analyser.throwError(`Classe '${parentIdentifier}' não foi definida.`, node)
  }
  // FIXME: To after type check
  // if (parentNode.name !== 'class-declaration') {
  //   Analyser.throwError(`Classes só podem herdar de outras classes`, node)
  // }
}

const interfaceImplementations = (node: AstNode): void => {
  const interfacesNode = (node.value as AstNode).value as AstNode[]
  const interfaceIdentifiers = interfacesNode.map((node: AstNode): string => node.value as string)

  interfaceIdentifiers.forEach((identifier: string): void => {
    const interfaceNode = Env.get().symbolTable.get(identifier)
    const members = (interfaceNode.value as AstNode[])[1].value as AstNode[]

    members.forEach((member: AstNode): void => {
      const memberIdentifier = member.value as string
      const memberNode = Env.get().symbolTable.get(`#${memberIdentifier}`)

      if (memberNode === null) {
        const classStack = Env.get().stackMap['CLASS_SCOPE']
        const className = classStack[classStack.length - 1]
        Analyser.throwError(
          `A classe '${className}' não está em conforme com a interface '${identifier}',\n` +
          `A propriedade ou método '${memberIdentifier}' não está implementada.`
          , node)
      }
    })
  })
}

export const evaluateIdentifierAsClassMember = Analyser.create(identifierAsClassMember)
export const evaluateFunctionCallAsClassInstantiation = Analyser.create(classInstantiation)
export const evaluateInterfaceUse = Analyser.create(interfaceUse)
export const evaluateSuperCallAtConstructorSubclass = Analyser.create(superCallAtConstructorSubclass)
export const evaluateInheritanceParent = Analyser.create(inheritanceParent)
export const evaluateInterfaceImplementations = Analyser.create(interfaceImplementations)
