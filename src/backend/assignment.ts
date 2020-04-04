import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { indexOfChildInParent, identifierValueOfLocNode } from '../utils/aux-functions'

const assignment = {
  between (): void {
    Env.get().codeOutput += ' = '
  },
  exit (): void {
    Env.get().codeOutput += '\\n'
  }
}

const loc = {
  enter (node: AstNode, parent: AstNode): void {
    // TODO: Move to exit method after expression visitor evaluate type of expression
    // to associate type to identifier at symbol table
    if (parent.name === 'assignment' && indexOfChildInParent(node, parent) === 0) {
      Env.get().symbolTable.put(identifierValueOfLocNode(node), node)
    }
  }
}

const identifier = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}

export default {
  assignment,
  loc,
  identifier
}
