import { AstNode } from '../traverse'
import Env from '../../enviroment/env'
import { indexOfChildInParent, identifierValueOfLocNode, locSubscriptableIsIdentifier, locNodeHasEmptyParams } from '../../utils/aux-functions'
import { evaluateLocUse, evaluatePrivatePropertyAccessAtLocNode } from '../semantics/definitions'
import { assignmentCodeGen, identifierCodeGen, objectableCodeGen, indexableCodeGen, locCodeGen } from '../generators/assignment'
import { evaluateIdentifierAsClassMember } from '../semantics/oo'

const assignment = {
  between (node: AstNode): void {
    const locLhsNode = (node.value as AstNode[])[0] as AstNode
    if (locSubscriptableIsIdentifier(locLhsNode)) {
      const rhsNode = (node.value as AstNode[])[1] as AstNode
      const expressionNodeName = (rhsNode.value as AstNode).name
      const functionName = identifierValueOfLocNode(locLhsNode)
      if (['block-function', 'inline-function'].includes(expressionNodeName)) {
        Env.get().stackMap['FUNCTION_NAME'].push(functionName)
      }
    }
    assignmentCodeGen.between()
  },

  exit (node: AstNode): void {
    // TODO: After than expression visitor evaluate type of expression,
    // associate type to identifier at symbol table
    const locLhsNode = (node.value as AstNode[])[0] as AstNode
    if (locSubscriptableIsIdentifier(locLhsNode)) {
      Env.get().symbolTable.put(identifierValueOfLocNode(locLhsNode), locLhsNode)
    }
    Env.get().stackMap['LHS'] = []
    assignmentCodeGen.exit()
  }
}

const loc = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name === 'assignment' && indexOfChildInParent(node, parent) === 0) {
      Env.get().stackMap['LHS'].push(Env.get().codeOutput.length)
    }
    if (parent.name !== 'assignment' || indexOfChildInParent(node, parent) !== 0 || locNodeHasEmptyParams(node) === false) {
      evaluateLocUse(node)
      evaluatePrivatePropertyAccessAtLocNode(node)
    }
    locCodeGen.enter(node, parent)
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent.name === 'assignment' && indexOfChildInParent(node, parent) === 0) {
      Env.get().stackMap['LHS'].push(Env.get().codeOutput.length)
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
