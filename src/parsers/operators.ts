import * as P from 'parsimmon'

export const LeftParenthesis = P.string('(')
export const RightParenthesis = P.string(')')
export const LeftBracket = P.string('[')
export const RightBracket = P.string(']')

export const NotOperator = P.string('!')
export const PlusOperator = P.string('+')
export const MinusOperator = P.string('-')
export const AsteriskOperator = P.string('*')
export const SlashOperator = P.string('/')
export const PercentOperator = P.string('%')

export const Equal = P.string('=')
export const Greater = P.string('>') // se foo igual a verdadeiro entao faca foo = falso fimse
export const Less = P.string('<')
export const GreaterEqual = P.string('>=') // P.seq(Greater, Equal)
export const LessEqual = P.string('<=') // P.seq(Less, Equal)

export const EqualOperator = P.string('==')
export const NotEqualOperator = P.string('!=') // P.seq(NotOperator, Equal)
export const EqualExprOperator = P.string('igual a')
export const NotEqualExprOperator = P.string('diferente de')

export const AndOperator = P.string('e')
export const OrOperator = P.string('ou')

/** unaryoperator -> ! | + | - */
export const UnaryOperator = P.alt(NotOperator, PlusOperator, MinusOperator)

/** termoperator -> * | / | % */
export const TermOperator = P.alt(AsteriskOperator, SlashOperator, PercentOperator)

/** addoperator -> + | - */
export const AddOperator = P.alt(PlusOperator, MinusOperator)

/** reloperator -> <= | < | >= | > */
export const RelOperator = P.alt(LessEqual, Less, GreaterEqual, Greater)

/** equalityoperator -> == | != */
export const EqualityOperator = P.alt(EqualOperator, NotEqualOperator, EqualExprOperator, NotEqualExprOperator)
