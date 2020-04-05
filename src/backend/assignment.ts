import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { indexOfChildInParent, identifierValueOfLocNode, locSubscriptableIsIdentifier } from '../utils/aux-functions'
import { evaluateLocUse } from './semantics/definitions'

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
    if (parent.name !== 'assignment' || indexOfChildInParent(node, parent) !== 0) {
      evaluateLocUse(node)
    }
  },
  exit (node: AstNode, parent: AstNode): void {
    // TODO: After than expression visitor evaluate type of expression,
    // associate type to identifier at symbol table
    if (parent.name === 'assignment' && indexOfChildInParent(node, parent) === 0 && locSubscriptableIsIdentifier(node)) {
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
