import {
  classDeclarationCodeGen,
  inheritanceCodeGen,
  propertiesCodeGen,
  propertyCodeGen,
  constructorCodeGen,
  methodCodeGen,
  classInstantiationCodeGen
} from './generator/oo'
import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { findClassMemberIndentifiers, isEmptyNode } from '../utils/aux-functions'
import { evaluateSuperCallAtConstructorSubclass, evaluateInheritanceParent } from './semantics/oo'

const classDeclaration = {
  enter (node: AstNode): void {
    const identifierNode = (node.value as AstNode[])[0]
    const identifier = identifierNode.value as string
    Env.get().symbolTable.put(identifier, node)
    Env.get().stackMap['classScope'].push(identifier)
    classDeclarationCodeGen.enter()
  },
  exit (): void {
    /* Pop Class scope created at contructor::enter */
    Env.get().popSymbolTable()
    classDeclarationCodeGen.exit()
    Env.get().stackMap['classScope'].pop()
  }
}

const inheritance = {
  // TODO: Check if interface exists and if subclass match with your members
  enter (node: AstNode): void {
    if (isEmptyNode(node) === false) {
      evaluateInheritanceParent(node)
    }
    inheritanceCodeGen.enter(node)
  },
  exit (): void {
    inheritanceCodeGen.exit()
  }
}

const properties = {
  enter (): void {
    propertiesCodeGen.enter()
  },
  exit (): void {
    propertiesCodeGen.exit()
  }
}

const property = {
  enter (node: AstNode): void {
    propertyCodeGen.enter(node)
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    propertyCodeGen.between(node, parent, index)
  },
  exit (): void {
    propertyCodeGen.exit()
  }
}

const constructor = {
  enter (node: AstNode, parent: AstNode): void {
    /* Create a new scope to Classes Properties and Methods */
    Env.get().pushSymbolTable()
    findClassMemberIndentifiers(parent).forEach(([id, node]): void => {
      Env.get().symbolTable.put(id !== 'super' ? `#${id}` : id, node)
    })
    const inheritanceNode = (parent.value as AstNode[])[0]
    if (isEmptyNode(node) === false && isEmptyNode(inheritanceNode) === false) {
      evaluateSuperCallAtConstructorSubclass(node)
    }
    constructorCodeGen.enter(node, parent)
  }
}

const method = {
  enter (node: AstNode): void {
    const nodeValue = node.value as AstNode[]
    const modifierValue = nodeValue[0].value
    const methodName = nodeValue[1].value as string
    if (modifierValue === 'estatico') {
      Env.get().stackMap['staticScope'].push(methodName)
    }
    methodCodeGen.enter(node)
  },
  exit (node: AstNode): void {
    const nodeValue = node.value as AstNode[]
    const modifierValue = nodeValue[0].value
    if (modifierValue === 'estatico') {
      Env.get().stackMap['staticScope'].pop()
    }
  }
}

const classInstantiation = {
  enter (): void {
    classInstantiationCodeGen.enter()
  }
}

export default {
  classDeclaration,
  inheritance,
  properties,
  property,
  constructor,
  method,
  classInstantiation
}
