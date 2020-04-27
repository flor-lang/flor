import { AstNode } from './traverse'
import Env from '../enviroment/env'
import { findIdentifierAtArgsNode } from '../utils/aux-functions'

const block = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'program') {
      Env.get().pushSymbolTable()
      Env.get().codeOutput += '{\n'
      // TODO: super() tem que vir antes do properties
      Env.get().codeOutput += Env.get().stackMap['block'].pop() || ''
    }
    if (parent.name === 'block-function') {
      const argsNode = (parent.value as AstNode[])[0]
      findIdentifierAtArgsNode(argsNode).forEach(([id, node]): void => {
        Env.get().symbolTable.put(id, node)
      })
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
