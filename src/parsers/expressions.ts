import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { Literal } from './literals'
import { Loc, LocParser, Identifier, IdentifierParser } from './assignment'
import {
  AddOperator,
  TermOperator,
  LeftParenthesis,
  RightParenthesis,
  RelOperator,
  EqualityOperator,
  AndOperator,
  OrOperator,
  UnaryOperator,
  Function,
  End
} from './operators'
import { BlockParser, Block } from './program'

export type ObjectParser = P.Parser<{}>
export type FactorParser = P.Parser<P.Node<'factor', {}>>
export type UnaryParser = P.Parser<P.Node<'unary', {}>>
export type TermParser = P.Parser<P.Node<'term', {}>>
export type AddParser = P.Parser<P.Node<'add', {}>>
export type RelParser = P.Parser<P.Node<'rel', {}>>
export type EqualityParser = P.Parser<P.Node<'equality', {}>>
export type JoinParser = P.Parser<P.Node<'join', {}>>
export type BoolParser = P.Parser<P.Node<'bool', {}>>
export type BlockFunctionParser = P.Parser<P.Node<'block-function', {}>>
export type ExpressionParser = P.Parser<P.Node<'expression', {}>>

/**
 * Parse Integers Numbers and Expressions between parenthesis
 *
 * factor -> (expr) | loc | literal
*/
export const Factor: FactorParser = P
  .alt(
    P.seqObj(
      LeftParenthesis, P.optWhitespace,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.lazy((): ExpressionParser => Expression).named('between-parenthesis'),
      P.optWhitespace, RightParenthesis
    ),
    P.lazy((): LocParser => Loc),
    Literal
  )
  .node('factor')

const UnaryLine = UnaryOperator
/**
 * Parse Unary Numbers with + or - operators
 *
 * unary -> +unary | -unary | factor
*/
export const Unary: UnaryParser = P
  .seqObj(
    P.alt(UnaryLine, P.optWhitespace).named('unaryline'),
    Factor.named('factor')
  )
  .node('unary')

const TermLine: ObjectParser = P
  .alt(
    P.seqObj(
      TermOperator.named('operator'), P.optWhitespace,
      Unary.named('unary'), P.optWhitespace,
      P.lazy((): ObjectParser => TermLine).named('termline')
    ),
    P.optWhitespace
  )
/**
 * Parse terms with factor operators(* / %)
 *
 * term -> term * unary | term / unary | term % unary | unary
*/
export const Term: TermParser = P
  .seqObj(
    Unary.named('unary'),
    P.optWhitespace,
    TermLine.named('termline')
  )
  .node('term')

const AddLine: ObjectParser = P
  .alt(
    P.seqObj(
      AddOperator.named('operator'), P.optWhitespace,
      Term.named('term'), P.optWhitespace,
      P.lazy((): ObjectParser => AddLine).named('addline')
    ),
    P.optWhitespace
  )
/**
 * Parse terms with add operators(+ -)
 *
 * add -> add + term | add - term | term
*/
export const Add: AddParser = P
  .seqObj(
    Term.named('term'),
    P.optWhitespace,
    AddLine.named('addline')
  )
  .node('add')

const Inequality: ObjectParser = P
  .seqObj(
    Add.named('lhs'), P.optWhitespace,
    RelOperator.named('operator'), P.optWhitespace,
    Add.named('rhs')
  )
/**
 * Parse inequalities relations (> < >= <=) between expressions
 *
 * rel -> rel < add | rel > add | rel >= add | rel <= add | add
*/
export const Rel: RelParser = P
  .alt(
    Inequality,
    Add
  )
  .node('rel')

export const EqualityLine: ObjectParser = P
  .alt(
    P.seqObj(
      EqualityOperator.named('operator'), P.optWhitespace,
      Rel.named('rel'), P.optWhitespace,
      P.lazy((): ObjectParser => EqualityLine).named('equalityline')
    ),
    P.optWhitespace
  )
/**
 * Parse equalities relations (== !=) between expressions
 *
 * equality -> equality == rel | equality != rel | rel
*/
export const Equality: EqualityParser = P
  .seqObj(
    Rel.named('rel'),
    P.optWhitespace,
    EqualityLine.named('equalityline')
  )
  .node('equality')

const JoinLine: ObjectParser = P
  .alt(
    P.seqObj(
      AndOperator, P.optWhitespace,
      Equality.named('equality'), P.optWhitespace,
      P.lazy((): ObjectParser => JoinLine).named('joinline')
    ),
    P.optWhitespace
  )
/**
 * Parse and relations ( e ) between expressions
 *
 * join -> join && equality | equality
*/
export const Join: JoinParser = P
  .seqObj(
    Equality.named('equality'),
    P.optWhitespace,
    JoinLine.named('joinline')
  )
  .node('join')

const Booline: ObjectParser = P
  .alt(
    P.seqObj(
      OrOperator, P.optWhitespace,
      Join.named('join'), P.optWhitespace,
      P.lazy((): ObjectParser => Booline).named('booline')
    ),
    P.optWhitespace
  )
/**
 * Parse or relations ( ou ) between expressions
 *
 * join -> join && equality | equality
*/
export const Bool: BoolParser = P
  .seqObj(
    Join.named('join'),
    P.optWhitespace,
    Booline.named('booline')
  )
  .node('bool')

/**
 * Parse block function expressions
 *
 * block-function -> funcao (identifier, ...) block fim
*/
export const BlockFunction: BlockFunctionParser = P
  .seqObj(
    Function, P.optWhitespace,
    P.lazy((): IdentifierParser => Identifier)
      .sepWrp(',', '(', ')')
      .named('args'),
    P.optWhitespace,
    P.lazy((): BlockParser => Block).named('block'),
    End
  ).node('block-function')

export const Expression: ExpressionParser = P
  .alt(
    Bool,
    BlockFunction
  )
  .node('expression')
