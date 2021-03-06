import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { Equal, LeftBracket, RightBracket, Dot } from './operators'
import { ObjectParser, Expression, ExpressionParser, BoolParser, Bool } from './expressions'
import { FunctionCall, FunctionCallParser } from './statements'
import { mapLocNode, nodePropertiesMapper } from '../utils/node-map'
import { FlorReservedWords } from '../utils/reserved-words'

export type IdentifierParser = P.Parser<P.Node<'identifier', string>>
export type SubscriptableParser = P.Parser<P.Node<'subscriptable', {}>>
export type ObjectableParser = P.Parser<P.Node<'objectable', {}>>
export type IndexableParser = P.Parser<P.Node<'indexable', {}>>
export type LocParser = P.Parser<P.Node<'loc', {}>>
export type AssignmentParser = P.Parser<P.Node<'assignment', {}>>

/**
 * Identifier parser
 *
 * identifier -> /#?[_]*([a-zA-Z_][a-zA-Z0-9]+|[a-zA-Z])+/
*/
export const Identifier: IdentifierParser = P
  .regexp(/#?[_]*([a-zA-Z_][a-zA-Z0-9]+|[a-zA-Z])+/)
  .assert((s: string): boolean => !FlorReservedWords.includes(s), `Erro de sintaxe: Identificador reservado`)
  .node('identifier')

/**
 * Parse subscriptables
 *
 * subscriptable -> function-call | identifier
*/
export const Subscriptable: SubscriptableParser = P
  .alt(
    P.lazy((): FunctionCallParser => FunctionCall),
    Identifier
  ).node('subscriptable')

/** objectable -> objectable locline | .subscriptable */
export const Objectable: ObjectableParser = P
  .seqObj(
    Dot,
    Subscriptable.named('param'),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): ObjectParser => Locline).named('locline')
  )
  .node('objectable')

/** indexable -> indexable locline | [expr] */
export const Indexable: IndexableParser = P
  .seqObj(
    P.lazy((): BoolParser => Bool)
      .wrap(LeftBracket, RightBracket)
      .node('bool')
      .named('param'),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): ObjectParser => Locline).named('locline')
  )
  .node('indexable')

/** locline -> objectable | indexable | ∊ */
const Locline: ObjectParser = P
  .alt(
    P.alt(
      Objectable,
      Indexable
    ),
    P.optWhitespace
  )
/**
 * Loc parser - list acess or subscriptable
 *
 * loc -> loc.subscriptable | loc[ expr ] | subscriptable
*/
export const Loc: LocParser = P
  .seqObj(
    Subscriptable.named('subscriptable'),
    P.optWhitespace,
    Locline.named('locline')
  )
  .optWspc()
  .node('loc')
  .map(mapLocNode)
  .map(nodePropertiesMapper(['subscriptable', 'params']))

/**
 * Parser to variable assignment statement
 *
 * assignment -> loc = expression
*/
export const Assignment: AssignmentParser = P
  .seqObj(
    Loc.named('lhs'),
    Equal, P.optWhitespace,
    P.lazy((): ExpressionParser => Expression).named('rhs')
  )
  .node('assignment')
  .map(nodePropertiesMapper(['lhs', 'rhs']))
