import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

export type StatementParser = P.Parser<P.Node<'statement', {}>>

export const Statement: StatementParser = P
  .alt(

  )
  .node('statement')
