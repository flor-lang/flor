import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { If, Then, Else, End, While, Do, ForEach, OfExpr, ForExpr, ToExpr, WithExpr, StepExpr } from './operators'
import { Expression, ObjectParser, ExpressionParser } from './expressions'
import { Assignment, Identifier, IdentifierParser, AssignmentParser } from './assignment'
import { Block, BlockParser } from './program'

export type IfThenElseStatementParser = P.Parser<P.Node<'if-then-else', {}>>
export type WhileStatementParser = P.Parser<P.Node<'while', {}>>
export type DoWhileStatementParser = P.Parser<P.Node<'do-while', {}>>
export type ForEachStatementParser = P.Parser<P.Node<'for-each', {}>>
export type ForToStatementParser = P.Parser<P.Node<'for-to', {}>>
export type StatementParser = P.Parser<P.Node<'statement', {}>>

/**
 * Parse If Then Else Statements
 *
 * if-then-else -> se expression entao block fim
 *              | se expression entao block senao block fim
 */
export const IfThenElseStatement: IfThenElseStatementParser = P
  .seqObj(
    If,
    P.lazy((): ExpressionParser => Expression).named('condition'),
    Then,
    P.seqObj(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.lazy((): BlockParser => Block).named('block')
    ).named('then'),
    P.alt(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.seqObj(Else, P.lazy((): BlockParser => Block).named('block')),
      P.optWhitespace
    ).named('else'),
    End
  )
  .node('if-then-else')

/**
 * Parse While Statements
 *
 * while -> enquanto expression faca block fim
 */
export const WhileStatement: WhileStatementParser = P
  .seqObj(
    While,
    P.lazy((): ExpressionParser => Expression).named('condition'),
    Do,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): BlockParser => Block).named('block'),
    End
  )
  .node('while')

/**
 * Parse Do-While Statements
 *
 * do-while -> faca block enquanto expression fim
 */
export const DoWhileStatement: DoWhileStatementParser = P
  .seqObj(
    Do,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): BlockParser => Block).named('block'),
    While,
    P.lazy((): ExpressionParser => Expression).named('condition'),
    End
  )
  .node('do-while')

/**
 * Parse For-Each Statements
 *
 * for-each -> para cada identifier de expression faca block fim
 */
export const ForEachStatement: ForEachStatementParser = P
  .seqObj(
    ForEach,
    P.lazy((): IdentifierParser => Identifier).named('identifier'),
    OfExpr,
    P.lazy((): ExpressionParser => Expression).named('iterator'),
    Do,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): BlockParser => Block).named('block'),
    End
  )
  .node('for-each')

const ForToLine: ObjectParser = P.seqObj(WithExpr, StepExpr, P.lazy((): ExpressionParser => Expression).named('step'))
/**
 * Parse For-To Statements
 *
 * for-to -> para identifier de expression ate expression faca block fim
 *         | para identifier de expression ate expression com passo expression faca block fim
 */
export const ForToStatement: ForToStatementParser = P
  .seqObj(
    ForExpr,
    P.lazy((): IdentifierParser => Identifier).named('identifier'),
    OfExpr,
    P.lazy((): ExpressionParser => Expression).named('start-iterator'),
    ToExpr,
    P.lazy((): ExpressionParser => Expression).named('end-iterator'),
    P.alt(ForToLine, P.optWhitespace).named('for-to-line'),
    Do,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): BlockParser => Block).named('block'),
    End
  )
  .node('for-to')

/**
 * Parse Statements
 *
 * statement -> assigment | if-then-else | while | do-while | for-each | for-to
 */
export const Statement: StatementParser = P
  .alt(
    P.lazy((): AssignmentParser => Assignment),
    IfThenElseStatement,
    WhileStatement,
    DoWhileStatement,
    ForEachStatement,
    ForToStatement
  )
  .node('statement')
