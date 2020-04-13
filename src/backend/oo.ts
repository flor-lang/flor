import {
  classDeclarationCodeGen,
  inheritanceCodeGen,
  propertiesCodeGen,
  propertyCodeGen,
  constructorCodeGen
} from './generator/oo'
import { AstNode } from './traverse'

const classDeclaration = {
  enter (): void {
    classDeclarationCodeGen.enter()
  },
  exit (): void {
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
  enter (node: AstNode): void {
    constructorCodeGen.enter(node)
  }
}

export default {
  classDeclaration,
  inheritance,
  properties,
  property,
  constructor
}
