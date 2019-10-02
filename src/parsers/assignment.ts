import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

import { Equal } from './operators'
import { Literal } from './literals'

export type IdentifierParser = P.Parser<P.Node<'identifier', string>>
export type AssignmentParser = P.Parser<P.Node<'assignment', {}>>

export const Identifier = P
  .regexp(/[_]*[a-zA-Z][a-zA-Z0-9_]*/)
  .node('identifier')

export const Assignment: AssignmentParser = P
  .seqObj(
    ['identifier' as never, Identifier.map((i): string => i.value) as never],
    P.optWhitespace,
    Equal,
    P.optWhitespace,
    Literal.named('value')
  )
  .node('assignment')
