import Env from '../../enviroment/env'
import { AstNode } from 'backend/traverse'
import { isEmptyNode } from '../../utils/aux-functions'
import { Polyfill } from '../../enviroment/polyfill'

export const interfaceDeclarationCodeGen = {
  enter (node: AstNode): void {
    const identifier = (node.value as AstNode[])[0].value as string
    if (Env.get().symbolTable.get(identifier) === null) {
      Env.get().codeOutput += 'let '
    }
    Env.get().codeOutput += `${identifier} = { nome: '${identifier}', __props__: [`
  },
  exit(): void {
    Env.get().codeOutput = Env.get().codeOutput.slice(0, -1) + '] };\n'
  }
}

export const classDeclarationCodeGen = {
  enter (node: AstNode): void {
    const metaNode = (node.value as AstNode[])[1] as AstNode
    const inheritanceNode = (metaNode.value as AstNode[])[0]
    if (inheritanceNode.value) {
      Env.get().injectPolyfill(Polyfill.INHERITANCE_VLDT);
      const name = (inheritanceNode.value as AstNode).value
      Env.get().codeOutput += `__validateInheritance__(${name}, '${name}')\n`
    }
    const implementationsNode = (metaNode.value as AstNode[])[1]
    if (Array.isArray(implementationsNode.value) === false) {
      Env.get().injectPolyfill(Polyfill.INTERFACE_VLDT);
      const interfaces = (implementationsNode.value as AstNode).value as AstNode[]
      const interfaceNames = interfaces.map((i) => i.value as string);
      interfaceNames.forEach(name => {
        Env.get().codeOutput += `__validateInterface__(${name}, '${name}')\n`
      })
    }
    Env.get().codeOutput += 'class '
  },
  exit (node: AstNode): void {
    Env.get().codeOutput += '}\n'
    const classStack = Env.get().stackMap['CLASS_SCOPE']
    const className = classStack[classStack.length - 1]
    Env.get().codeOutput += `${className}.__propertiesDeclarations__.bind(null)()\n`

    const metaNode = (node.value as AstNode[])[1] as AstNode
    const propsNodes = (metaNode.value as AstNode[])[2].value as AstNode[]
    const methodsNodes = (metaNode.value as AstNode[])[4].value as AstNode[]
    const staticFilter = (propNode: AstNode) => (propNode.value as AstNode[])[0].value !== 'estatico'
    const identifierMap = (propNode: AstNode) => (propNode.value as AstNode[])[1].value

    const attr = propsNodes.filter(staticFilter).map(identifierMap)
      .concat(methodsNodes.filter(staticFilter).map(identifierMap))

    Env.get().codeOutput += `${className}.__attr__ = [${attr.map(a => `'${a}'`)}]\n`
    
    const implementationsNode = (metaNode.value as AstNode[])[1]
    if (Array.isArray(implementationsNode.value) === false) {
      Env.get().injectPolyfill(Polyfill.INTERFACE_IMPL_VLDT);
      const interfaces = (implementationsNode.value as AstNode).value as AstNode[]
      const interfaceNames = interfaces.map((i) => i.value as string);
      interfaceNames.forEach(name => {
        Env.get().codeOutput += `__validateInterfaceImpl__('${className}', ${name}, ${className}.__attr__)\n`
      })
    }
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
    const classStack = Env.get().stackMap['CLASS_SCOPE']
    const className = classStack[classStack.length - 1]
    Env.get().stackMap['PROP_DECLARATIONS'].push(`${className}.__propertiesDeclarations__.bind(this)()\n`)
  }
}

export const propertyCodeGen = {
  enter (node: AstNode): void {
    const nodeValue = node.value as AstNode[]
    const modifierValue = nodeValue[0].value
    let owner = 'this'
    if (modifierValue === 'estatico') {
      const classStack = Env.get().stackMap['CLASS_SCOPE']
      const className = classStack[classStack.length - 1]
      Env.get().codeOutput += `if ('${nodeValue[1].value}' in ${className} === false) {`
      owner = className as string
    } else {
      Env.get().codeOutput += `if (this && this.${nodeValue[1].value} === undefined) {`
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
        Env.get().injectPolyfill(Polyfill.EXPR)
        Env.get().codeOutput += '__pf__.expr('
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
      const propDeclarations = Env.get().stackMap['PROP_DECLARATIONS'].pop()
      Env.get().codeOutput += `constructor(){\n${
        isEmptyNode(inheritanceNode) ? '' : 'super();\n'}${propDeclarations}}`
    } else if (isEmptyNode(inheritanceNode) === false) {
      Env.get().stackMap['SUPER_FIRST'].push('super')
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
