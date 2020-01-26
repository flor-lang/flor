import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { If, Then, Else, End } from './operators'
import { Expression } from './expressions'
import { Assignment } from './assignment'

export type IfThenElseStatementParser = P.Parser<P.Node<'if-then-else', {}>>
export type StatementParser = P.Parser<P.Node<'statement', {}>>

export const IfThenElseStatement: IfThenElseStatementParser = P
  .seqObj(
    If,
    Expression.named('condition'),
    Then,
    P.seqObj(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.lazy((): StatementParser => Statement).named('stmt')
    ).named('then'),
    P.alt(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.seqObj(Else, P.lazy((): StatementParser => Statement).named('stmt')),
      P.optWhitespace
    ).named('else'),
    End
  )
  .node('if-then-else')

export const Statement: StatementParser = P
  .alt(
    Assignment,
    IfThenElseStatement
  )
  .node('statement')
