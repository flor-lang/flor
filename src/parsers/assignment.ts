import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { Equal, LeftBracket, RightBracket, Dot } from './operators'
import { ObjectParser, Expression, ExpressionParser, BoolParser, Bool } from './expressions'
import { FunctionCall, FunctionCallParser } from './statements'
import { mapLocNode } from '../utils/node-map'

export type IdentifierParser = P.Parser<P.Node<'identifier', string>>
export type SubscriptableParser = P.Parser<P.Node<'subscriptable', {}>>
export type ObjectableParser = P.Parser<P.Node<'objectable', {}>>
export type IndexableParser = P.Parser<P.Node<'indexable', {}>>
export type LocParser = P.Parser<P.Node<'loc', {}>>
export type AssignmentParser = P.Parser<P.Node<'assignment', {}>>

export const reservedList: string[] = [
  'verdadeiro', 'falso', 'nulo',
  'e', 'ou',
  'se', 'senao', 'entao',
  'enquanto', 'faca',
  'a', 'de', 'ate', 'com',
  'igual', 'diferente', 'para', 'cada', 'passo',
  'funcao', 'retornar', 'fim',
  'definir', 'interface', 'classe', 'novo', 'nova',
  'construtor', 'propriedades', 'metodos',
  'privado', 'publico', 'estatico'
]

/**
 * Identifier parser
 *
 * identifier -> /[_]*[a-zA-Z][a-zA-Z0-9_]*\/
*/
export const Identifier: IdentifierParser = P
  .regexp(/[_]*[a-zA-Z][a-zA-Z0-9_]*/)
  .assert((s: string): boolean => !reservedList.includes(s), `Erro de sintaxe: Identificador reservado`)
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
    Subscriptable.named('variable'),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    P.lazy((): ObjectParser => Locline).named('locline')
  )
  .node('objectable')

/** indexable -> indexable locline | [expr] */
export const Indexable: IndexableParser = P
  .seqObj(
    LeftBracket, P.optWhitespace,
    P.lazy((): BoolParser => Bool).named('index'),
    P.optWhitespace, RightBracket,
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
  .node('loc')
  .map(mapLocNode)

/**
 * Parser to variable assignment statement
 *
 * assignment -> loc = expression
*/
export const Assignment: AssignmentParser = P
  .seqObj(
    Loc.optWspc().named('lhs'),
    Equal, P.optWhitespace,
    P.lazy((): ExpressionParser => Expression).named('expression')
  )
  .node('assignment')
