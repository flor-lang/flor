import Env from '../../enviroment/env'
import { AstNode } from '../traverse'

export const assignmentCodeGen = {
  between (): void {
    Env.get().codeOutput += ' = '
  },
  exit (): void {
    Env.get().codeOutput += '\\n'
  }
}

export const identifierCodeGen = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
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
