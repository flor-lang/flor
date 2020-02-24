import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { ExpressionParser, Expression } from './expressions'

export type StringLiteralParser = P.Parser<P.Node<'string', string>>
export type NumberLiteralParser = P.Parser<P.Node<'number', number>>
export type BooleanLiteralParser = P.Parser<P.Node<'boolean', boolean>>
export type NullLiteralParser = P.Parser<P.Node<'null', string>>
export type ArrayLiteralParser = P.Parser<P.Node<'array', []>>
export type LiteralParser = P.Parser<P.Node<'literal', string|number|boolean>>

export const StringLiteral: StringLiteralParser = P
  // .regexp(/".*"/)
  .regexp(/^"(?:[^\\"]|\\.)*"/)
  .map((s): string => s.slice(1, -1))
  .node('string')

export const NumberLiteral: NumberLiteralParser = P
  .regexp(/[0-9]+(\.[0-9]+)?/)
  .map(Number)
  .node('number')

export const BooleanLiteral: BooleanLiteralParser = P
  .regexp(/verdadeiro|falso/)
  .map((s): boolean => /verdadeiro/.test(s))
  .node('boolean')

export const NullLiteral: NullLiteralParser = P
  .string('nulo')
  .node('null')

export const ArrayLiteral: ArrayLiteralParser = P
  .lazy((): ExpressionParser => Expression)
  .sepWrp(',', '[', ']')

/**
 * Parser to literals
 *
 * literal -> string | number | boolean | null
*/
export const Literal: LiteralParser = P
  .alt(
    StringLiteral,
    NullLiteral,
    BooleanLiteral,
    NumberLiteral,
    ArrayLiteral
  )
  .node('literal')
