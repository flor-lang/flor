import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { If, Then, Else, End, While, Do } from './operators'
import { Expression } from './expressions'
import { Assignment } from './assignment'

export type IfThenElseStatementParser = P.Parser<P.Node<'if-then-else', {}>>
export type WhileStatementParser = P.Parser<P.Node<'while', {}>>
export type DoWhileStatementParser = P.Parser<P.Node<'do-while', {}>>
export type StatementParser = P.Parser<P.Node<'statement', {}>>

/**
 * Parse If Then Else Statements
 *
 * if-then-else -> se expression entao statement fim
 *              | se expression entao statement senao statement fim
 */
export const IfThenElseStatement: IfThenElseStatementParser = P
  .seqObj(
    If,
    Expression.named('condition'),
    Then,
    P.seqObj(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.lazy((): StatementParser => Statement).named('statement')
    ).named('then'),
    P.alt(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.seqObj(Else, P.lazy((): StatementParser => Statement).named('statement')),
      P.optWhitespace
    ).named('else'),
    End
  )
  .node('if-then-else')

/**
 * Parse While Statements
 *
 * while -> enquanto expression faca statement fim
 */
export const WhileStatement: WhileStatementParser = P
  .seqObj(
    While,
    Expression.named('condition'),
    Do,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): StatementParser => Statement).named('statement'),
    End
  )
  .node('while')

/**
 * Parse Do-While Statements
 *
 * do-while -> faca statement enquanto expression fim
 */
export const DoWhileStatement: DoWhileStatementParser = P
  .seqObj(
    Do,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): StatementParser => Statement).named('statement'),
    While,
    Expression.named('condition'),
    End
  )
  .node('do-while')

export const Statement: StatementParser = P
  .alt(
    Assignment,
    IfThenElseStatement,
    WhileStatement,
    DoWhileStatement
  )
  .node('statement')
