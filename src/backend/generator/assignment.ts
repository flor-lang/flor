import Env from '../../enviroment/env'
import { AstNode } from '../traverse'

export const assignmentCodeGen = {
  between (): void {
    Env.get().codeOutput += ' = '
  },
  exit (): void {
    Env.get().codeOutput += ';'
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
