import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { ExpressionParser, Expression, ObjectParser } from './expressions'
import { Colon } from './operators'
import { nodePropertiesMapper } from './../utils/node-map'

export type StringLiteralParser = P.Parser<P.Node<'string', string>>
export type NumberLiteralParser = P.Parser<P.Node<'number', number>>
export type BooleanLiteralParser = P.Parser<P.Node<'boolean', boolean>>
export type NullLiteralParser = P.Parser<P.Node<'nil', string>>
export type ArrayLiteralParser = P.Parser<P.Node<'array', {}>>
export type DictionaryLiteralParser = P.Parser<P.Node<'dictionary', {}>>
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
  .node('nil')

export const ArrayLiteral: ArrayLiteralParser = P
  .lazy((): ExpressionParser => Expression)
  .sepWrp(',', '[', ']')
  .node('array')

const Serializable: ObjectParser = P.alt(StringLiteral /*, NumberLiteral */)
export const DictionaryLiteral: DictionaryLiteralParser = P
  .seqObj(
    Serializable.node('serializable').named('key'),
    P.optWhitespace, Colon, P.optWhitespace,
    P.lazy((): ExpressionParser => Expression).named('value')
  ).node('key-value').map(nodePropertiesMapper(['key', 'value']))
  .sepWrp(',', '{', '}')
  .node('dictionary')

/**
 * Parser to literals
 *
 * literal -> string | number | boolean | null | array
*/
export const Literal: LiteralParser = P
  .alt(
    StringLiteral,
    NullLiteral,
    BooleanLiteral,
    NumberLiteral,
    ArrayLiteral,
    DictionaryLiteral
  )
  .node('literal')
