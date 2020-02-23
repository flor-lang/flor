import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { Equal, LeftBracket, RightBracket, Colon } from './operators'
import { ObjectParser, Expression, ExpressionParser } from './expressions'

export type IdentifierParser = P.Parser<P.Node<'identifier', string>>
export type FunctionCallParser = P.Parser<P.Node<'function-call', {}>>
export type SubscriptableParser = P.Parser<P.Node<'subscriptable', {}>>
export type LocParser = P.Parser<P.Node<'loc', {}>>
export type AssignmentParser = P.Parser<P.Node<'assignment', {}>>

export const reservedList: string[] = [
  'verdadeiro', 'falso', 'nulo',
  'e', 'ou',
  'se', 'senao', 'entao',
  'enquanto', 'faca',
  'a', 'de', 'ate', 'com',
  'igual', 'diferente', 'para', 'cada', 'passo',
  'funcao', 'retornar', 'fim'
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

const LabeledArgs: ObjectParser = P
  .seqObj(
    Identifier.named('label'),
    P.optWhitespace, Colon, P.optWhitespace,
    P.lazy((): ExpressionParser => Expression).named('value')
  )
  .sepWrp(',', '(', ')')
/**
 * Parse function call
 *
 * function-call -> identifier (identifier: expr, ...)
*/
export const FunctionCall: FunctionCallParser = P
  .seqObj(
    Identifier.named('identifier'), P.optWhitespace,
    LabeledArgs.named('labeled-args')
  )
  .node('function-call')
/**
 * Parse subscriptables
 *
 * subscriptable -> function-call | identifier
*/
export const Subscriptable: SubscriptableParser = P
  .alt(
    FunctionCall,
    Identifier
  ).node('subscriptable')

const Locline: ObjectParser = P
  .alt(
    P.seqObj(
      LeftBracket, P.optWhitespace,
      P.lazy((): ExpressionParser => Expression).named('expression'),
      P.optWhitespace, RightBracket,
      P.lazy((): ObjectParser => Locline).named('locline')
    ),
    P.optWhitespace
  )
/**
 * Loc parser - list acess or subscriptable
 *
 * loc -> loc[ expr ] | subscriptable
*/
export const Loc: LocParser = P
  .seqObj(
    Subscriptable.named('subscriptable'),
    P.optWhitespace,
    Locline.named('locline')
  )
  .node('loc')

/**
 * Parser to variable assignment statement
 *
 * assignment -> loc = expression
*/
export const Assignment: AssignmentParser = P
  .seqObj(
    Loc.named('loc'),
    P.optWhitespace,
    Equal,
    P.optWhitespace,
    P.lazy((): ExpressionParser => Expression).named('expression')
  )
  .node('assignment')
