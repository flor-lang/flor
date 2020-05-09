import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { findIdentifierAtArgsNode } from '../utils/aux-functions'

const block = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'program') {
      Env.get().pushSymbolTable()
      Env.get().codeOutput += '{\n'
      if (Env.get().stackMap['superFirst'].length === 0) {
        Env.get().codeOutput += Env.get().stackMap['propDeclarations'].pop() || ''
      }
    }
    if (parent.name === 'block-function') {
      const argsNode = (parent.value as AstNode[])[0]
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
      Env.get().codeOutput += Env.get().stackMap['propDeclarations'].pop()
      Env.get().stackMap['superFirst'].pop()
    }
  },
  exit (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'program') {
      Env.get().popSymbolTable()
      Env.get().codeOutput += '}'
    }
  }
}

export default {
  block
}
