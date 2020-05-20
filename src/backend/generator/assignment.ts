import Env from '../../enviroment/env'
import { AstNode } from '../traverse'
import { indexOfChildInParent, identifierValueOfLocNode } from '../../utils/aux-functions'

export const assignmentCodeGen = {
  between (): void {
    Env.get().codeOutput += ' = '
  },
  exit (): void {
    Env.get().codeOutput += ';'
  }
}

export const locCodeGen = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name === 'assignment' && indexOfChildInParent(node, parent) === 0) {
      const identifier = identifierValueOfLocNode(node)
      const identifierNode = Env.get().symbolTable.get(identifier)
      if (identifierNode === null && identifier.startsWith('#') === false) {
        Env.get().codeOutput += 'let '
      }
    }
  }
}

export const identifierCodeGen = {
  enter (node: AstNode, parent: AstNode): void {
    if (['labeled-arg', 'interfaces'].includes(parent.name) === false) {
      Env.get().codeOutput += (node.value as string).replace('#', 'this.')
    }
  }
}

export const objectableCodeGen = {
  enter (): void {
    Env.get().codeOutput += '.'
  }
}

export const indexableCodeGen = {
  enter (): void {
    Env.get().codeOutput += '['
  },
  exit (): void {
    Env.get().codeOutput += ']'
  }
}
