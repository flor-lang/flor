import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { Equal, LeftBracket, RightBracket } from './operators'
import { ObjectParser, Expression, ExpressionParser } from './expressions'
import { identifierTable } from '../main'

export type IdentifierParser = P.Parser<P.Node<'identifier', string>>
export type LocParser = P.Parser<P.Node<'loc', {}>>
export type AssignmentParser = P.Parser<P.Node<'assignment', {}>>

export const reservedList: string[] = [
  'verdadeiro', 'falso', 'nulo',
  'e', 'ou',
  'se', 'senao', 'entao',
  'enquanto', 'faca',
  'a', 'de', 'ate', 'com',
  'igual', 'diferente', 'para', 'cada', 'passo',
  'fim'
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
  .map((node): P.Node<'identifier', string> => {
    if (process.env.PARSE_ENV === 'MAIN') {
      identifierTable.add(JSON.stringify(node))
    }
    return node
  })

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
 * Loc parser - list acess or identifier
 *
 * loc -> loc[ add ] | identifier
*/
export const Loc: LocParser = P
  .seqObj(
    Identifier.named('identifier'),
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
