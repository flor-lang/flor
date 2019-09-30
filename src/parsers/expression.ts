import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { NumberLiteral } from './literals'
import { AddOperator, FactorOperator } from './operators'

export const LeftParenthesis = P.string('(')
export const RightParenthesis = P.string(')')

export type FactorParser = P.Parser<P.Node<'factor', {}>>
export type UnaryParser = P.Parser<P.Node<'unary', {}>>
export type TermParser = P.Parser<P.Node<'term', {}>>
export type AddParser = P.Parser<P.Node<'add', {}>>

export const Factor: FactorParser = P
  .alt(
    P.seqObj(
      LeftParenthesis, P.optWhitespace,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.lazy((): AddParser => Add).namedParser('between-parenthesis'),
      P.optWhitespace, RightParenthesis
    ),
    NumberLiteral
  )
  .node('factor')

const UnaryLine = AddOperator
export const Unary: UnaryParser = P
  .seqObj(
    P.alt(UnaryLine, P.optWhitespace).namedParser('unaryline'),
    Factor.namedParser('factor')
  )
  .node('unary')

const TermLine = P.seqObj(FactorOperator.namedParser('operator'), P.optWhitespace, Unary.namedParser('unary'))
export const Term: TermParser = P
  .seqObj(
    Unary.namedParser('unary'),
    P.optWhitespace,
    P.alt(TermLine, P.optWhitespace).namedParser('termline')
  )
  .node('term')

export const AddLine = P.seqObj(AddOperator.namedParser('operator'), P.optWhitespace, Term.namedParser('term'))
export const Add: AddParser = P
  .seqObj(
    Term.namedParser('term'),
    P.optWhitespace,
    P.alt(AddLine, P.optWhitespace).namedParser('addline')
  )
  .node('add')
