import { AstNode } from '../traverse'
import Env from '../../enviroment/env'
import { insertFunctionArgumentsInSymbolTable } from '../../utils/aux-functions'
import { blockCodeGen } from '../../backend/generators/program'

const block = {
  enter (node: AstNode, parent: AstNode): void {
    Env.get().stackMap['CURRENT_BLOCK_PARENT'].push(parent.name)

    if (parent.name !== 'program') {
      Env.get().pushSymbolTable()
      blockCodeGen.enter()
      if (['while-stmt', 'do-while', 'for-each'].includes(parent.name)) {
        Env.get().stackMap['ITERATION_BREAKER_BLOCK'].push('LOOP')
      }
    }

    if (parent.name === 'block-function') {
      Env.get().stackMap['ITERATION_BREAKER_BLOCK'].push('FUNCTION')
      insertFunctionArgumentsInSymbolTable(parent)
    }

    if (parent.name === 'for-each') {
      const iteratorIdentifierNode = (parent.value as AstNode[])[0]
      Env.get().symbolTable.put(iteratorIdentifierNode.value as string, iteratorIdentifierNode)
    }
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    if (index === 0 && Env.get().stackMap['SUPER_FIRST'].length > 0) {
      blockCodeGen.between()
      Env.get().stackMap['SUPER_FIRST'].pop()
    }
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'program') {
      Env.get().popSymbolTable()
      blockCodeGen.exit()
      if (['while-stmt', 'do-while', 'for-each', 'block-function'].includes(parent.name)) {
        Env.get().stackMap['ITERATION_BREAKER_BLOCK'].pop()
      }
    }
    Env.get().stackMap['CURRENT_BLOCK_PARENT'].pop()
  }
}

export default {
  block
}
