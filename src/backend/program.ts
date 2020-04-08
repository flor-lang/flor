import { AstNode } from './traverse'
import Env from '../enviroment/env'
import SymbolTable from '../enviroment/symbol-table'

let saved: SymbolTable = null

const block = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name !== 'program') {
      saved = Env.get().symbolTable
      Env.get().symbolTable = new SymbolTable(saved)
      Env.get().codeOutput += '{\\n'
    }
  },
  exit (node: AstNode, parent: AstNode): void {
    // console.log(Env.get().symbolTable)
    if (parent.name !== 'program') {
      Env.get().symbolTable = saved
      Env.get().codeOutput += '}'
    }
  }
}

export default {
  block
}
