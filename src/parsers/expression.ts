import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { NumberLiteral } from './literals'
import { AddOperator, TermOperator, LeftParenthesis, RightParenthesis } from './operators'

export type FactorParser = P.Parser<P.Node<'factor', {}>>
export type UnaryParser = P.Parser<P.Node<'unary', {}>>
export type TermParser = P.Parser<P.Node<'term', {}>>
export type AddParser = P.Parser<P.Node<'add', {}>>

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

const TermLine = P.seqObj(TermOperator.named('operator'), P.optWhitespace, Unary.named('unary'))
export const Term: TermParser = P
  .seqObj(
    Unary.named('unary'),
    P.optWhitespace,
    P.alt(TermLine, P.optWhitespace).named('termline')
  )
  .node('term')

export const AddLine = P.seqObj(AddOperator.named('operator'), P.optWhitespace, Term.named('term'))
export const Add: AddParser = P
  .seqObj(
    Term.named('term'),
    P.optWhitespace,
    P.alt(AddLine, P.optWhitespace).named('addline')
  )
  .node('add')
