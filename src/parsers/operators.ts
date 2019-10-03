import * as P from 'parsimmon'

export const LeftParenthesis = P.string('(')
export const RightParenthesis = P.string(')')

export const PlusOperator = P.string('+')
export const MinusOperator = P.string('-')
export const AsteriskOperator = P.string('*')
export const SlashOperator = P.string('/')
export const PercentOperator = P.string('%')

export const Equal = P.string('=')
export const Greater = P.string('>')
export const Less = P.string('<')
export const GreaterEqual = P.string('>=')// P.seq(Greater, Equal)
export const LessEqual = P.string('<=')// P.seq(Less, Equal)

export const AddOperator = P.alt(PlusOperator, MinusOperator)
export const TermOperator = P.alt(AsteriskOperator, SlashOperator, PercentOperator)
export const RelOperator = P
  .alt(
    LessEqual,
    Less,
    GreaterEqual,
    Greater
  )
