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
    Env.get().codeOutput += '{\\n'
  }
}
