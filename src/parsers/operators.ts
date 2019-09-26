import * as P from 'parsimmon'

export type AssignParser = P.Parser<P.Node<'assign', string>>

export const AddOperator = P.alt(P.string('+'), P.string('-'))
export const FactorOperator = P.alt(P.string('*'), P.string('/'))

export const Assign: AssignParser = P
  .regexp(/=/)
  .node('assign')
