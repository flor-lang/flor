import * as P from 'parsimmon'

export const AddOperator = P.alt(P.string('+'), P.string('-'))
export const TermOperator = P.alt(P.string('*'), P.string('/'))

export const LeftParenthesis = P.string('(')
export const RightParenthesis = P.string(')')

export const Equal = P.string('=')
