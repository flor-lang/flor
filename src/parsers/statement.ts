import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { If, Then, End } from './operators'
import { Expression } from './expression'
import { Assignment } from './assignment'

export type IfStatementParser = P.Parser<P.Node<'if', {}>>
export type StatementParser = P.Parser<P.Node<'statement', {}>>

export const IfStatement: IfStatementParser = P
  .seqObj(
    If,
    Expression.named('condition'),
    Then,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): StatementParser => Statement).named('then'), P.optWhitespace,
    End
  )
  .node('if')

export const Statement: StatementParser = P
  .alt(
    Assignment
  )
  .node('statement')
