import { AstNode } from '../backend/traverse'

const emptyIndex = { column: 0, line: 0, offset: 0 }
const emptyAstNode: AstNode = { name: '', value: '', start: emptyIndex, end: emptyIndex }

export const FlorDeLib: { [key: string]: AstNode } = {
  Texto: emptyAstNode,
  Numero: emptyAstNode,
  Lista: emptyAstNode,
  Math: emptyAstNode,
  Matematica: emptyAstNode,
  txt: emptyAstNode,
  bool: emptyAstNode,
  list: emptyAstNode,
  dic: emptyAstNode,
  num: emptyAstNode,
  int: emptyAstNode,
  real: emptyAstNode,
  escrever: emptyAstNode
}
