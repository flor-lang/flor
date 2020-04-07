import { AstNode } from './traverse'
import { operatorCodeGen } from './generator/operators'

const operator = {
  enter (node: AstNode): void {
    operatorCodeGen.enter(node)
  }
}

export default {
  operator
}
