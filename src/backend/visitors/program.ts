import { AstNode } from '../traverse'
import Env from '../../enviroment/env'
import { findIdentifierAtArgsNode } from '../../utils/aux-functions'
import { blockCodeGen } from '../../backend/generators/program'

const block = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'program') {
      Env.get().pushSymbolTable()
      blockCodeGen.enter()
    }
    if (parent.name === 'block-function') {
      const argsNode = (parent.value as AstNode[])[0]
      const functionName = Env.get().stackMap['FUNCTION_NAME'].pop()
      if (functionName) {
        Env.get().symbolTable.put(functionName as string, parent)
      }
      findIdentifierAtArgsNode(argsNode).forEach(([id, node]): void => {
        Env.get().symbolTable.put(id, node)
      })
    }
    if (parent.name === 'for-each') {
      const iteratorIdentifierNode = (parent.value as AstNode[])[0]
      Env.get().symbolTable.put(iteratorIdentifierNode.value as string, iteratorIdentifierNode)
    }
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    if (index === 0 && Env.get().stackMap['superFirst'].length > 0) {
      blockCodeGen.between()
      Env.get().stackMap['superFirst'].pop()
    }
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'program') {
      Env.get().popSymbolTable()
      blockCodeGen.exit()
    }
  }
}

export default {
  block
}
