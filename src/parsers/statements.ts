import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { If, Then, Else, End, While, Do, ForEach, OfExpr, ForExpr, ToExpr, WithExpr, StepExpr, Return, Colon } from './operators'
import { Expression, ObjectParser, ExpressionParser } from './expressions'
import { Assignment, Identifier, IdentifierParser, AssignmentParser, LocParser, Loc } from './assignment'
import { Block, BlockParser } from './program'
import { InterfaceDeclarationParser, InterfaceDeclaration, ClassDeclarationParser, ClassDeclaration } from './oo'
import { nodePropertiesMapper } from './../utils/node-map'

export type IfThenElseStatementParser = P.Parser<P.Node<'if-then-else', {}>>
export type WhileStatementParser = P.Parser<P.Node<'while', {}>>
export type DoWhileStatementParser = P.Parser<P.Node<'do-while', {}>>
export type ForEachStatementParser = P.Parser<P.Node<'for-each', {}>>
export type ForToStatementParser = P.Parser<P.Node<'for-to', {}>>
export type ReturnStatementParser = P.Parser<P.Node<'return', {}>>
export type FunctionCallParser = P.Parser<P.Node<'function-call', {}>>
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

const ForToLine: ObjectParser = P
  .alt(
    P.seqObj(
      WithExpr, StepExpr,
      P.lazy((): ExpressionParser => Expression).named('step')
    )
      .node('for-to-line')
      .map(nodePropertiesMapper(['step'])),
    P.optWhitespace
  )
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
    ForToLine.named('for-to-line'),
    Do,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): BlockParser => Block).named('block'),
    End
  )
  .node('for-to')
  .map(nodePropertiesMapper(['identifier', 'start-iterator', 'end-iterator', 'for-to-line', 'block']))

/**
 * Parser function returns
 *
 * return -> retornar expr
 */
export const ReturnStatement: ReturnStatementParser = P
  .seqObj(
    Return,
    P.alt(
      P.lazy((): ExpressionParser => Expression),
      P.optWhitespace
    ).named('expression')
  )
  .node('return')
  .map(nodePropertiesMapper(['expression']))

type LabeledArgsParser = P.Parser<P.Node<'labeled-args', {}>>
const LabeledArgs: LabeledArgsParser = P
  .seqObj(
    P.lazy((): IdentifierParser => Identifier).named('label'),
    P.optWhitespace, Colon, P.optWhitespace,
    P.lazy((): ExpressionParser => Expression).named('value')
  )
  .node('labeled-arg')
  .map(nodePropertiesMapper(['label', 'value']))
  .sepWrp(',', '(', ')')
  .node('labeled-args')

/**
 * Parse function call
 *
 * function-call -> identifier (identifier: expr, ...)
*/
export const FunctionCall: FunctionCallParser = P
  .seqObj(
    P.lazy((): IdentifierParser => Identifier).named('identifier'), P.optWhitespace,
    LabeledArgs.named('labeled-args')
  )
  .node('function-call')
  .map(nodePropertiesMapper(['identifier', 'labeled-args']))

/**
 * Parse Statements
 *
 * statement -> assigment
 *             | interface-declaration | class-declaration | function-call
 *             | if-then-else | while | do-while | for-each | for-to | return
 */
export const Statement: StatementParser = P
  .alt(
    P.lazy((): AssignmentParser => Assignment),
    P.lazy((): InterfaceDeclarationParser => InterfaceDeclaration),
    P.lazy((): ClassDeclarationParser => ClassDeclaration),
    FunctionCall,
    IfThenElseStatement,
    WhileStatement,
    DoWhileStatement,
    ForEachStatement,
    ForToStatement,
    ReturnStatement,
    P.lazy((): LocParser => Loc)
  )
  .node('statement')
