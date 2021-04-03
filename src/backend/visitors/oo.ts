import {
  classDeclarationCodeGen,
  inheritanceCodeGen,
  propertiesCodeGen,
  propertyCodeGen,
  constructorCodeGen,
  methodCodeGen,
  classInstantiationCodeGen,
  interfaceDeclarationCodeGen
} from '../generators/oo'
import {
  evaluateSuperCallAtConstructorSubclass,
  evaluateInheritanceParent,
  evaluateInterfaceUse,
  evaluateInterfaceImplementations
} from '../semantics/oo'
import { AstNode } from '../traverse'
import Env from '../../enviroment/env'
import { findClassMemberIndentifiers, isEmptyNode } from '../../utils/aux-functions'
import { evaluateGlobalDeclaration } from '../semantics/definitions'

const interfaceDeclaration = {
  enter (node: AstNode): void {
    evaluateGlobalDeclaration(node)
    const identifier = (node.value as AstNode[])[0].value as string
    interfaceDeclarationCodeGen.enter(node)
    Env.get().symbolTable.put(identifier, node)
  },
  exit(): void {
    interfaceDeclarationCodeGen.exit()
  }
}

const classDeclaration = {
  enter (node: AstNode): void {
    evaluateGlobalDeclaration(node)
    const identifier = (node.value as AstNode[])[0].value as string
    Env.get().symbolTable.put(identifier, node)
    Env.get().stackMap['CLASS_SCOPE'].push(identifier)
    classDeclarationCodeGen.enter(node)
  },
  exit (node: AstNode): void {
    /* Pop Class scope created at contructor::enter */
    Env.get().popSymbolTable()
    classDeclarationCodeGen.exit(node)
    Env.get().stackMap['CLASS_SCOPE'].pop()
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

const interfaces = {
  enter (node: AstNode): void {
    const identifierNode = (node.value as AstNode[])[0]
    evaluateInterfaceUse(identifierNode)
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    const identifierNode = (node.value as AstNode[])[index + 1]
    evaluateInterfaceUse(identifierNode)
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
  exit (node: AstNode): void {
    propertyCodeGen.exit(node)
  }
}

const constructor = {
  enter (node: AstNode, parent: AstNode): void {
    const metaNode = (parent.value as AstNode[])
    /* Create a new scope to Classes Properties and Methods */
    /* Pop-ed at classDeclaration::exit */
    Env.get().pushSymbolTable()
    // findClassMemberIndentifiers(parent).forEach(([id, node]): void => {
    //   Env.get().symbolTable.put(id !== 'super' ? `#${id}` : id, node)
    // })
    const inheritanceNode = metaNode[0]
    if (isEmptyNode(inheritanceNode) === false) {
      Env.get().symbolTable.put('super', inheritanceNode)
    }

    /* Evaluate if class implements interfaces */
    // const implementationsNode = metaNode[1]
    // if (isEmptyNode(implementationsNode) === false) {
    //   evaluateInterfaceImplementations(implementationsNode)
    // }

    /* Evaluate 'super' call in not empty constructor */
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
      Env.get().stackMap['STATIC_SCOPE'].push(methodName)
    }
    methodCodeGen.enter(node)
  },
  exit (node: AstNode): void {
    const nodeValue = node.value as AstNode[]
    const modifierValue = nodeValue[0].value
    if (modifierValue === 'estatico') {
      Env.get().stackMap['STATIC_SCOPE'].pop()
    }
  }
}

const classInstantiation = {
  enter (): void {
    classInstantiationCodeGen.enter()
  }
}

export default {
  interfaceDeclaration,
  classDeclaration,
  inheritance,
  interfaces,
  properties,
  property,
  constructor,
  method,
  classInstantiation
}
