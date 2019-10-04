import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { Equal, LeftBracket, RightBracket } from './operators'
import { ObjectParser, AddParser, Add, Expression } from './expression'
import { Literal } from './literals'

export type IdentifierParser = P.Parser<P.Node<'identifier', string>>
export type LocParser = P.Parser<P.Node<'loc', {}>>
export type AssignmentParser = P.Parser<P.Node<'assignment', {}>>

/**
 * Identifier parser
 *
 * identifier -> /[_]*[a-zA-Z][a-zA-Z0-9_]*\/
*/
export const Identifier: IdentifierParser = P
  .regexp(/[_]*[a-zA-Z][a-zA-Z0-9_]*/)
  .node('identifier')

const Locline: ObjectParser = P
  .alt(
    P.seqObj(
      LeftBracket, P.optWhitespace,
      P.lazy((): AddParser => Add).named('add'),
      P.optWhitespace, RightBracket,
      P.lazy((): ObjectParser => Locline).named('locline')
    ),
    P.optWhitespace
  )
/**
 * Loc parser - list acess or identifier
 *
 * loc -> loc[ expr ] | identifier
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
    // Loc.named('loc'),
    ['identifier' as never, Identifier.map((i): string => i.value) as never],
    P.optWhitespace,
    Equal,
    P.optWhitespace,
    Literal.named('value')
    // Expression.named('expression')
  )
  .node('assignment')
