import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { Literal, LiteralParser } from './literals'
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
  End,
  ColonEqual,
  If,
  Else
} from './operators'
import { BlockParser, Block } from './program'
import { ClassInstantiationParser, ClassInstantiation } from './oo'
import { mapArithmeticRecursiveNode, mapUnaryNode, nodePropertiesMapper } from '../utils/node-map'

export type ObjectParser = P.Parser<{}>
export type FactorParser = P.Parser<P.Node<'factor', {}>>
export type UnaryParser = P.Parser<P.Node<'unary', {}>>
export type TermParser = P.Parser<P.Node<'term', {}>>
export type AddParser = P.Parser<P.Node<'add', {}>>
export type InequalityParser = P.Parser<P.Node<'inequality', {}>>
export type EqualityParser = P.Parser<P.Node<'equality', {}>>
export type JoinParser = P.Parser<P.Node<'join', {}>>
export type BoolParser = P.Parser<P.Node<'bool', {}>>
export type BoolBtwParenthesesParser = P.Parser<P.Node<'wrapped', {}>>
export type BlockFunctionParser = P.Parser<P.Node<'block-function', {}>>
export type InlineFunctionParser = P.Parser<P.Node<'inline-function', {}>>
export type ConditionalExpressionParser = P.Parser<P.Node<'conditional-expression', {}>>
export type ExpressionParser = P.Parser<P.Node<'expression', {}>>

/**
 * Parse Integers Numbers and Expressions between parenthesis
 *
 * factor -> wrapped | loc | literal
*/
export const Factor: ObjectParser = P
  .alt(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): BoolBtwParenthesesParser => BoolBtwParentheses),
    P.lazy((): LocParser => Loc),
    P.lazy((): LiteralParser => Literal)
  )
  // .node('factor')

const UnaryLine: ObjectParser = UnaryOperator
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
  .map(mapUnaryNode)

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
  .map(mapArithmeticRecursiveNode)

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
  .map(mapArithmeticRecursiveNode)

const InequalityLine: ObjectParser = P
  .alt(
    P.seqObj(
      RelOperator.named('operator'), P.optWhitespace,
      Add.named('add'), P.optWhitespace,
      P.lazy((): ObjectParser => InequalityLine).named('inequalityline')
    ),
    P.optWhitespace
  )
/**
 * Parse inequalities relations (> < >= <=) between expressions
 *
 * inequalities -> inequalities < add | inequalities > add | inequalities >= add | inequalities <= add | add
*/
export const Inequality: InequalityParser = P
  .seqObj(
    Add.named('add'),
    P.optWhitespace,
    InequalityLine.named('inequalityline')
  )
  .node('inequality')
  .map(mapArithmeticRecursiveNode)

const EqualityLine: ObjectParser = P
  .alt(
    P.seqObj(
      EqualityOperator.named('operator'), P.optWhitespace,
      Inequality.named('inequality'), P.optWhitespace,
      P.lazy((): ObjectParser => EqualityLine).named('equalityline')
    ),
    P.optWhitespace
  )

/**
 * Parse equalities relations (== !=) between expressions
 *
 * equality -> equality == inequalities | equality != inequalities | inequalities
*/
export const Equality: EqualityParser = P
  .seqObj(
    Inequality.named('inequality'),
    P.optWhitespace,
    EqualityLine.named('equalityline')
  )
  .node('equality')
  .map(mapArithmeticRecursiveNode)

const JoinLine: ObjectParser = P
  .alt(
    P.seqObj(
      AndOperator.named('operator'), P.optWhitespace,
      Equality.named('equality'), P.optWhitespace,
      P.lazy((): ObjectParser => JoinLine).named('joinline')
    ),
    P.optWhitespace
  )
/**
 * Parse and relations ( e ) between expressions
 *
 * join -> join e equality | equality
*/
export const Join: JoinParser = P
  .seqObj(
    Equality.named('equality'),
    P.optWhitespace,
    JoinLine.named('joinline')
  )
  .node('join')
  .map(mapArithmeticRecursiveNode)

const Boolline: ObjectParser = P
  .alt(
    P.seqObj(
      OrOperator.named('operator'), P.optWhitespace,
      Join.named('join'), P.optWhitespace,
      P.lazy((): ObjectParser => Boolline).named('boolline')
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
    Boolline.named('boolline')
  )
  .node('bool')
  .map(mapArithmeticRecursiveNode)

/**
 * Parse bool expressions between parentheses
 *
 * wrapped -> ( bool )
*/
export const BoolBtwParentheses: BoolBtwParenthesesParser = Bool
  .wrap(LeftParenthesis, RightParenthesis)
  .node('wrapped')

const Args: ObjectParser = P.lazy((): IdentifierParser => Identifier).sepWrp(',', '(', ')')
/**
 * Parse block function expressions
 *
 * block-function -> funcao (identifier, ...) block fim
*/
export const BlockFunction: BlockFunctionParser = P
  .seqObj(
    Function, P.optWhitespace,
    Args.named('args'),
    P.optWhitespace,
    P.lazy((): BlockParser => Block).named('block'),
    End
  )
  .node('block-function')
  .map(nodePropertiesMapper(['args', 'block']))

/**
 * Parse inline function expressions
 *
 * inline-function -> (identifier, ...) := expression
*/
export const InlineFunction: InlineFunctionParser = P
  .seqObj(
    Args.named('args'), P.optWhitespace,
    ColonEqual, P.optWhitespace,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): ExpressionParser => Expression).named('expression')
  )
  .node('inline-function')
  .map(nodePropertiesMapper(['args', 'expression']))

/**
 * Parse conditional expressions
 *
 * conditional-expression -> expression se expression | expression se expression senao expression
 */
export const ConditionalExpression: ConditionalExpressionParser = P
  .seqObj(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): ExpressionParser => Expression).named('then'),
    If,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): ExpressionParser => Expression).named('condition'),
    P.alt(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.seqMap(Else, P.lazy((): ExpressionParser => Expression), (_, expr): unknown => expr),
      P.optWhitespace
    ).named('else')
  )
  .node('conditional-expression')
  .map(nodePropertiesMapper(['condition', 'then', 'else']))

/**
 * Parse expressions
 *
 * expr -> class-instantiation | inline-function | block-function | bool
*/
export const Expression: ExpressionParser = P
  .alt(
    P.lazy((): ClassInstantiationParser => ClassInstantiation),
    InlineFunction,
    BlockFunction,
    Bool
  )
  .node('expression')
