import Env from '../../enviroment/env'
import { AstNode } from '../traverse'

export const operatorCodeGen = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}
