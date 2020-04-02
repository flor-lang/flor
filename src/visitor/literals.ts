import { AstNode } from './traverse'
import Env from './enviroment'

const number = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}

export default {
  number
}
