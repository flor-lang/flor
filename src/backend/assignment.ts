import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { indexOfChildInParent, identifierValueOfLocNode, locSubscriptableIsIdentifier, locNodeHasEmptyParams } from '../utils/aux-functions'
import { evaluateLocUse, evaluatePrivatePropertyAccessAtLocNode } from './semantics/definitions'
import { assignmentCodeGen, identifierCodeGen, objectableCodeGen, indexableCodeGen, locCodeGen } from './generator/assignment'
import { evaluateIdentifierAsClassMember } from './semantics/oo'

const assignment = {
  between (): void {
    assignmentCodeGen.between()
  },
  exit (node: AstNode): void {
    // TODO: After than expression visitor evaluate type of expression,
    // associate type to identifier at symbol table
    const locLhsNode = (node.value as AstNode[])[0] as AstNode
    // evaluatePrivatePropertyAccessAtLocNode(locLhsNode)
    if (locSubscriptableIsIdentifier(locLhsNode)) {
      Env.get().symbolTable.put(identifierValueOfLocNode(locLhsNode), locLhsNode)
    }
    Env.get().stackMap['lhs'] = []
    assignmentCodeGen.exit()
  }
}

const loc = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name === 'assignment' && indexOfChildInParent(node, parent) === 0) {
      Env.get().stackMap['lhs'].push(Env.get().codeOutput.length)
    }
    if (parent.name !== 'assignment' || indexOfChildInParent(node, parent) !== 0 || locNodeHasEmptyParams(node) === false) {
      evaluateLocUse(node)
      evaluatePrivatePropertyAccessAtLocNode(node)
    }
    locCodeGen.enter(node, parent)
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent.name === 'assignment' && indexOfChildInParent(node, parent) === 0) {
      Env.get().stackMap['lhs'].push(Env.get().codeOutput.length)
    }
  }
}

const identifier = {
  enter (node: AstNode, parent: AstNode): void {
    evaluateIdentifierAsClassMember(node)
    identifierCodeGen.enter(node, parent)
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
