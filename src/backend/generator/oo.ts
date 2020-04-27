import Env from '../../enviroment/env'
import { AstNode } from 'backend/traverse'
import { isEmptyNode } from '../../utils/aux-functions'

export const classDeclarationCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'class '
  },
  exit (): void {
    Env.get().codeOutput += '}'
  }
}

export const inheritanceCodeGen = {
  enter (node: AstNode): void {
    if (isEmptyNode(node) === false) {
      Env.get().codeOutput += ' extends '
    }
  },
  exit (): void {
    Env.get().codeOutput += '{\n'
  }
}

export const propertiesCodeGen = {
  enter (): void {
    Env.get().codeOutput += '__propertiesDeclarations__() {'
  },
  exit (): void {
    Env.get().codeOutput += '}'
    Env.get().stackMap['block'].push('this.__propertiesDeclarations__()\n')
  }
}

export const initializeCodeGen = {
  exit (node: AstNode, parent: AstNode): void {
    if (parent.name === 'property') {
      Env.get().codeOutput += ';'
    }
  }
}

export const propertyCodeGen = {
  enter (): void {
    Env.get().codeOutput += `this.`
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    const assignmentNode = (node.value as AstNode[])[2]
    if (index === 1) {
      Env.get().codeOutput += ' = '
      if (isEmptyNode(assignmentNode)) {
        Env.get().codeOutput += 'null'
      }
    }
  }
}

export const constructorCodeGen = {
  enter (node: AstNode, parent: AstNode): void {
    const inheritanceNode = (parent.value as AstNode[])[0]
    if (isEmptyNode(node)) {
      const propDeclarations = Env.get().stackMap['block'].pop()
      Env.get().codeOutput += `constructor(){\n${
        isEmptyNode(inheritanceNode) ? '' : 'super();\n'}${propDeclarations}}`
    }
  }
}

export const classInstantiationCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'new '
  }
}
