import Env from '../../enviroment/env'
import { AstNode } from '../traverse'

export const operatorCodeGen = {
  enter (node: AstNode): void {
    if (node.value !== '^') {
      Env.get().codeOutput += node.value
    } else {
      Env.get().codeOutput += ','
    }
  }
}
