import { AstNode } from '../traverse'
import Env from '../../enviroment/env'
import { insertFunctionArgumentsInSymbolTable } from '../../utils/aux-functions'
import { blockCodeGen } from '../../backend/generators/program'

const block = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'program') {
      Env.get().pushSymbolTable()
      blockCodeGen.enter()
    }
    if (parent.name === 'block-function') {
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
    }
  }
}

export default {
  block
}
