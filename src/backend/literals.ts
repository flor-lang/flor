import { AstNode } from './traverse'
import { numberCodeGen } from './generator/literals'

const number = {
  enter (node: AstNode): void {
    numberCodeGen.enter(node)
  }
}

export default {
  number
}
