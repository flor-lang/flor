import { AstNode } from '../backend/traverse'

const emptyIndex = { column: 0, line: 0, offset: 0 }
export const EmptyAstNode: AstNode = { name: '', value: '', start: emptyIndex, end: emptyIndex }

export const StandardLib: { [key: string]: AstNode } = {
  Texto: EmptyAstNode,
  Numero: EmptyAstNode,
  Lista: EmptyAstNode,
  Math: EmptyAstNode,
  Matematica: EmptyAstNode,
  txt: EmptyAstNode,
  bool: EmptyAstNode,
  list: EmptyAstNode,
  dic: EmptyAstNode,
  num: EmptyAstNode,
  int: EmptyAstNode,
  real: EmptyAstNode,
  escrever: EmptyAstNode
}
