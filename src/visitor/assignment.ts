import { AstNode } from './traverse'
import Env from './enviroment'

const assignment = {
  between (): void {
    Env.get().codeOutput += ' = '
  },
  exit (): void {
    Env.get().codeOutput += '\\n'
  }
}

const identifier = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}

export default {
  assignment,
  identifier
}
