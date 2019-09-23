import * as P from 'parsimmon'

export type AssignParser = P.Parser<P.Node<'assign', string>>

export const Assign: AssignParser = P
  .regexp(/=/)
  .node('assign')
