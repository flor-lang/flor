import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { indexOfChildInParent, identifierValueOfLocNode, locSubscriptableIsIdentifier } from '../utils/aux-functions'
import { evaluateLocUse } from './semantics/definitions'
import { assignmentCodeGen, identifierCodeGen, objectableCodeGen, indexableCodeGen } from './generator/assignment'

const assignment = {
  between (): void {
    assignmentCodeGen.between()
  },
  exit (): void {
    assignmentCodeGen.exit()
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
    identifierCodeGen.enter(node)
  }
}

const objectable = {
  enter (): void {
    objectableCodeGen.enter()
  }
}

const indexable = {
  enter (): void {
    indexableCodeGen.enter()
  },
  exit (): void {
    indexableCodeGen.exit()
  }
}

export default {
  assignment,
  loc,
  identifier,
  objectable,
  indexable
}
