import Env from '../../enviroment/env'
import { AstNode } from '../traverse'
import { indexOfChildInParent, identifierValueOfLocNode } from '../../utils/aux-functions'
import { JSReservedWords } from '../../utils/reserved-words'

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
        Env.get().stackMap['LHS'][0] = Env.get().stackMap['LHS'][0] as number + 4
      }
    }
  }
}

export const identifierCodeGen = {
  enter (node: AstNode, parent: AstNode): void {
    const excludedParents = ['labeled-arg', 'interfaces', 'interface-declaration']
    if (excludedParents.includes(parent.name) === false) {
      let identifier = node.value as string
      if (identifier.startsWith('#')) {
        Env.get().codeOutput += 'this.'
        identifier = identifier.substr(1)
      }
      if (JSReservedWords.includes(identifier)) {
        identifier = `${identifier}_`
      }
      if (parent.name === 'interface-members') {
        identifier = `'${identifier}',`
      }
      Env.get().codeOutput += identifier
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
