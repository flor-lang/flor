import { wrappedCodeGen, unaryCodeGen, blockFunctionCodeGen, argsCodeGen, inlineFunctionCodeGen } from './generator/expressions'
import { AstNode } from 'backend/traverse'
import Env from '../enviroment/env'
import { findIdentifierAtArgsNode } from '../utils/aux-functions'

const expression = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent && parent.name === 'inline-function') {
      Env.get().pushSymbolTable()
      const argsNode = (parent.value as AstNode[])[0]
      findIdentifierAtArgsNode(argsNode).forEach(([id, node]): void => {
        Env.get().symbolTable.put(id, node)
      })
    }
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent && parent.name === 'inline-function') {
      Env.get().popSymbolTable()
    }
  }
}

const wrapped = {
  enter (): void {
    wrappedCodeGen.enter()
  },
  exit (): void {
    wrappedCodeGen.exit()
  }
}

const unary = {
  enter (): void {
    unaryCodeGen.enter()
  },
  exit (): void {
    unaryCodeGen.exit()
  }
}

const blockFunction = {
  enter (node: AstNode, parent: AstNode): void {
    blockFunctionCodeGen.enter(node, parent)
  }
}

const args = {
  enter (): void {
    argsCodeGen.enter()
  },
  between (): void {
    argsCodeGen.between()
  },
  exit (): void {
    argsCodeGen.exit()
  }
}

export const inlineFunction = {
  between (node: AstNode, parent: AstNode): void {
    inlineFunctionCodeGen.between(node, parent)
  },
  exit (node: AstNode, parent: AstNode): void {
    inlineFunctionCodeGen.exit(node, parent)
  }
}

export default {
  expression,
  wrapped,
  unary,
  blockFunction,
  args,
  inlineFunction
}
