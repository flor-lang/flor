import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { NumberLiteral } from './literals'
import { AddOperator, TermOperator, LeftParenthesis, RightParenthesis, RelOperator, EqualityOperator } from './operators'

export type ObjectParser = P.Parser<{}>
export type FactorParser = P.Parser<P.Node<'factor', {}>>
export type UnaryParser = P.Parser<P.Node<'unary', {}>>
export type TermParser = P.Parser<P.Node<'term', {}>>
export type AddParser = P.Parser<P.Node<'add', {}>>
export type RelParser = P.Parser<P.Node<'rel', {}>>
export type EqualityParser = P.Parser<P.Node<'equality', {}>>

export const Factor: FactorParser = P
  .alt(
    P.seqObj(
      LeftParenthesis, P.optWhitespace,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.lazy((): AddParser => Add).named('between-parenthesis'),
      P.optWhitespace, RightParenthesis
    ),
    NumberLiteral
  )
  .node('factor')

const UnaryLine = AddOperator
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
export const Equality: EqualityParser = P
  .seqObj(
    Rel.named('rel'),
    P.optWhitespace,
    EqualityLine.named('equalityline')
  )
  .node('equality')
