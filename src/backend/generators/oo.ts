import Env from '../../enviroment/env'
import { AstNode } from 'backend/traverse'
import { isEmptyNode } from '../../utils/aux-functions'

export const classDeclarationCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'class '
  },
  exit (): void {
    Env.get().codeOutput += '}\n'
    const classStack = Env.get().stackMap['classScope']
    const className = classStack[classStack.length - 1]
    Env.get().codeOutput += `${className}.__propertiesDeclarations__.bind(null)()\n`
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
    Env.get().codeOutput += 'static __propertiesDeclarations__() {'
  },
  exit (): void {
    Env.get().codeOutput += '}'
    const classStack = Env.get().stackMap['classScope']
    const className = classStack[classStack.length - 1]
    Env.get().stackMap['propDeclarations'].push(`${className}.__propertiesDeclarations__.bind(this)()\n`)
  }
}

export const propertyCodeGen = {
  enter (node: AstNode): void {
    const nodeValue = node.value as AstNode[]
    const modifierValue = nodeValue[0].value
    let owner = 'this'
    if (modifierValue === 'estatico') {
      const classStack = Env.get().stackMap['classScope']
      const className = classStack[classStack.length - 1]
      Env.get().codeOutput += `if ('${nodeValue[1].value}' in ${className} === false) {`
      owner = className as string
    } else {
      Env.get().codeOutput += 'if (this) {'
    }
    Env.get().codeOutput += `${owner}.`
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    const assignmentNode = (node.value as AstNode[])[2]
    if (index === 1) {
      Env.get().codeOutput += ' = '
      if (isEmptyNode(assignmentNode)) {
        Env.get().codeOutput += 'null'
      } else {
        Env.get().codeOutput += '__expr__('
      }
    }
  },
  exit (node: AstNode): void {
    const assignmentNode = (node.value as AstNode[])[2]
    if (isEmptyNode(assignmentNode) === false) {
      Env.get().codeOutput += ')'
    }
    Env.get().codeOutput += '}\n'
  }
}

export const constructorCodeGen = {
  enter (node: AstNode, parent: AstNode): void {
    const inheritanceNode = (parent.value as AstNode[])[0]
    if (isEmptyNode(node)) {
      const propDeclarations = Env.get().stackMap['propDeclarations'].pop()
      Env.get().codeOutput += `constructor(){\n${
        isEmptyNode(inheritanceNode) ? '' : 'super();\n'}${propDeclarations}}`
    } else if (isEmptyNode(inheritanceNode) === false) {
      Env.get().stackMap['superFirst'].push('super')
    }
  }
}

export const methodCodeGen = {
  enter (node: AstNode): void {
    const nodeValue = node.value as AstNode[]
    const modifierValue = nodeValue[0].value
    if (modifierValue === 'estatico') {
      Env.get().codeOutput += ' static '
    }
  }
}

export const classInstantiationCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'new '
  }
}
