import {
  classDeclarationCodeGen,
  inheritanceCodeGen
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

export default {
  classDeclaration,
  inheritance
}
