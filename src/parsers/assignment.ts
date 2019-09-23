import * as P from 'parsimmon'

import { Assign } from './operators'
import { Literal } from './literals'

export type IdentifierParser = P.Parser<P.Node<'identifier', string>>
export type AssignmentParser = P.Parser<P.Node<'assignment', {}>>

export const Identifier = P
  .regexp(/[a-zA-Z_][a-zA-Z0-9_]*/)
  .node('identifier')

// do parse file to relational and arithmetic operators
// do parse file to expression evaluate

export const Assignment: AssignmentParser = P
  .seqObj(
    Identifier,
    P.optWhitespace,
    Assign,
    P.optWhitespace,
    Literal
  )
  .node('assignment')
