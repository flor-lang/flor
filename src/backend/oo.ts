import {
  classDeclarationCodeGen,
  inheritanceCodeGen,
  propertiesCodeGen,
  propertyCodeGen,
  initializeCodeGen,
  constructorCodeGen,
  classInstantiationCodeGen
} from './generator/oo'
import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { findClassMemberIndentifiers } from '../utils/aux-functions'

const classDeclaration = {
  enter (node: AstNode): void {
    const identifierNode = (node.value as AstNode[])[0]
    const identifier = identifierNode.value as string
    Env.get().symbolTable.put(identifier, node)
    Env.get().stackMap['classScope'].push(identifier)
    classDeclarationCodeGen.enter()
  },
  exit (): void {
    Env.get().stackMap['classScope'].pop()
    /* Pop Class scope created at contructor::enter */
    Env.get().popSymbolTable()
    classDeclarationCodeGen.exit()
  }
}

const inheritance = {
  enter (node: AstNode): void {
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
  enter (): void {
    propertyCodeGen.enter()
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    propertyCodeGen.between(node, parent, index)
  }
}

const initialize = {
  exit (node: AstNode, parent: AstNode): void {
    initializeCodeGen.exit(node, parent)
  }
}

const constructor = {
  enter (node: AstNode, parent: AstNode): void {
    /* Create a new scope to Classes Properties and Methods */
    Env.get().pushSymbolTable()
    findClassMemberIndentifiers(parent).forEach(([id, node]): void => {
      Env.get().symbolTable.put(`#${id}`, node)
    })
    constructorCodeGen.enter(node, parent)
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
  initialize,
  constructor,
  classInstantiation
}
