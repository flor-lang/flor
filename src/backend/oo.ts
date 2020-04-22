import {
  classDeclarationCodeGen,
  inheritanceCodeGen,
  propertiesCodeGen,
  propertyCodeGen,
  constructorCodeGen,
  classInstantiationCodeGen
} from './generator/oo'
import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { findClassMemberIndentifiers } from '../utils/aux-functions'

const classDeclaration = {
  enter (node: AstNode): void {
    const identifierNode = (node.value as AstNode[])[0]
    Env.get().symbolTable.put(identifierNode.value as string, node)
    classDeclarationCodeGen.enter()
  },
  exit (): void {
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

const constructor = {
  enter (node: AstNode, parent: AstNode): void {
    /* Create a new scope to Classes Properties and Methods */
    Env.get().pushSymbolTable()
    findClassMemberIndentifiers(parent).forEach(([id, node]): void => {
      Env.get().symbolTable.put(`#${id}`, node)
    })
    constructorCodeGen.enter(node)
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
  classInstantiation
}
