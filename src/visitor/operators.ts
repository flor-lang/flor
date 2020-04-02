import { AstNode } from './traverse'
import Env from './enviroment'

const operator = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}

export default {
  operator
}
