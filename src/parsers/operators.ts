import * as P from 'parsimmon'
import '../utils/parsimmon-extension'

export const LeftParenthesis = P.string('(')
export const RightParenthesis = P.string(')')
export const LeftBracket = P.string('[')
export const RightBracket = P.string(']')

export const Colon = P.string(':')
export const Dot = P.string('.')

export const TheExpr = P.string('a').wspc()
export const EqualExpr = P.string('igual').wspc()
export const DifferentExpr = P.string('diferente').wspc()
export const ForExpr = P.string('para').wspc()
export const EachExpr = P.string('cada').wspc()
export const OfExpr = P.string('de').wspc()
export const ToExpr = P.string('ate').wspc()
export const WithExpr = P.string('com').wspc()
export const StepExpr = P.string('passo').wspc()
export const End = P.string('fim').wspc()

export const NotOperator = P.string('!')
export const PlusOperator = P.string('+')
export const MinusOperator = P.string('-')
export const AsteriskOperator = P.string('*')
export const SlashOperator = P.string('/')
export const PercentOperator = P.string('%')

export const Equal = P.string('=')
export const Greater = P.string('>')
export const Less = P.string('<')
export const GreaterEqual = P.string('>=')
export const LessEqual = P.string('<=')

export const EqualOperator = P.string('==')
export const NotEqualOperator = P.string('!=')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EqualExprOperator = P.seqMap(EqualExpr, TheExpr, (_, __): string => '==')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NotEqualExprOperator = P.seqMap(DifferentExpr, OfExpr, (_, __): string => '!=')

export const AndOperator = P.string('e').wspc()
export const OrOperator = P.string('ou').wspc()

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

export const Do = P.string('faca').wspc()

export const If = P.string('se').wspc()
export const Then = P.string('entao').wspc()
export const Else = P.string('senao').wspc()

export const While = P.string('enquanto').wspc()
export const ForEach = P.seq(ForExpr, EachExpr)

export const Function = P.string('funcao')
export const Return = P.string('retornar').wspc()
export const ColonEqual = P.seq(Colon, Equal)

export const Define = P.string('definir').wspc()
export const Interface = P.string('interface').wspc()
export const Class = P.string('classe').wspc()
export const Inherit = P.string('heranca')
export const Implements = P.string('interfaces')
export const Constructor = P.string('construtor')
export const Properties = P.string('propriedades')
export const Methods = P.string('metodos')
export const Private = P.string('privado')
export const Public = P.string('publico')
export const AccessModifier = P.alt(Private, Public)
