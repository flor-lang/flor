import { Factor, Unary, Term, Add, Inequality, Equality, Join, Bool, BlockFunction, InlineFunction, ConditionalExpression, Exponential } from '../../src/parsers/expressions'
import { canParse, cantParse } from '../utils'


test('parse factor', (): void => {
  const canParseFactor = canParse(Factor)
  const cantParseFactor = cantParse(Factor)

  canParseFactor(['5', '"5"', '(5)', '(-5 * 8)', '(1 ou 1)', 'verdadeiro', '(falso ou verdadeiro)', 'foo', '( 0 + 0 )'])
  cantParseFactor(['5 - 1', '9 + - 3', '5 -1', 'verdadeiro ou falso'])
})

test('parse unary', (): void => {
  const canParseUnary = canParse(Unary)
  const cantParseUnary = cantParse(Unary)

  canParseUnary(['5', '-5', '+5', '-(-5)', '-foo', '-foo[bar]', '!(5 > 4)', '!verdadeiro'])
  cantParseUnary(['- 5', '-+5', '*5', '', 'foo!'])
})

test('parse exponential', (): void => {
  const canParseExponential = canParse(Exponential)
  const cantParseExponential = cantParse(Exponential)

  canParseExponential(['2^3', '2^-4', '-4^-1', '(-1)^(-3)', 'base^expoente', '2^(5 * 2)'])
  cantParseExponential(['5^', '^2', '^', '2^5 * 2', '2^10 + 4'])
})

test('parse term', (): void => {
  const canParseTerm = canParse(Term)
  const cantParseTerm = cantParse(Term)

  canParseTerm(['5*10', '-5*0', '1/5', '2 / (-5)', '2 * -1', '2 % 2', '1 * 1 * 1', 'foo / var * arr[0]'])
  cantParseTerm(['1/2/', '2+1', '2 - 1', '*5', '%1'])
})

test('parse add', (): void => {
  const canParseAdd = canParse(Add)
  const cantParseAdd = cantParse(Add)

  canParseAdd(['5+10', '-5+0', '1-5', '2/(2-5)', '2 - -1', '5', '2 + 2 + 2', 'arr[0] + ("foo" + "bar")'])
  cantParseAdd(['1+2-', '2-*5'])
})

test('can parse inequality operation', (): void => {
  const canParseRel = canParse(Inequality)
  const cantParseRel = cantParse(Inequality)

  canParseRel([
    '5>2', '2 < 1', '5>=5', '2<=2', '5 >= (5+2)', '(1*1) <= (1/1)',
    '(1<=1)>(2>=1)', 'foo < arr[0]', '5 < 4 < 3', '2 > (2+3) < 1 <= (2<1)'
  ])
  cantParseRel(['5>>2', '2=2', '3==3', '', '>', '<3<3'])
})

test('can parse equality operation', (): void => {
  const canParseEquality = canParse(Equality)
  const cantParseEquality = cantParse(Equality)

  canParseEquality(['1==1', '2!=-1', '-10 == 0', '8 != -(87+1)', '1 == 1 == 1', '1 igual a 1', '2 diferente de 1', 'oito diferente de um'])
  cantParseEquality(['1 !== 1', '20 === 1', '!=1', '', '2 igual 5', '2 diferente 1'])
})

test('can parse join operation', (): void => {
  const canParseJoin = canParse(Join)
  const cantParseJoin = cantParse(Join)

  canParseJoin(['2 e 2', '1 e 5', '10 e 0 e 8', '5 e arr[0]'])
  cantParseJoin(['1e'/*, 'e1'*/, '', 'e 1'])
})

test('can parse bool operation', (): void => {
  const canParseBool = canParse(Bool)
  const cantParseBool = cantParse(Bool)

  canParseBool(['2 ou 2', '1 ou 5', '10 e 0 ou 8', '"bar" ou arr[1]'])
  cantParseBool(['1ou'/*, 'ou1'*/, '', 'ou 1'])
})

test('can parse block function', (): void => {
  const canParseBlockFunction = canParse(BlockFunction)
  const cantParseBlockFunction = cantParse(BlockFunction)

  canParseBlockFunction([
    'funcao(numero) numero = 0 fim',
    'funcao () c = "Olá Mundo" fim',
    `funcao (lista)
       aux = lista[0]
       lista[0] = lista[1]
       lista[1] = aux
     fim`,
    `funcao ( x, y )
       aux = x * y
       aux = aux / 2
     fim`
  ])

  cantParseBlockFunction([
    'funcao(numero) numero = 0',
    '() x=0 fim',
    '(x) := x*x',
    'funcao ("") x = [] fim',
    'funcao (0) fim'
  ])
})

test('can parse inline function', (): void => {
  const canParseInlineFunction = canParse(InlineFunction)
  const cantParseInlineFunction = cantParse(InlineFunction)

  canParseInlineFunction([
    '(numero) := numero * 0',
    '() := Pessoa',
    '(x, y) :=  x + y',
    '(x) := x >= 0',
    '(x) := x % 2 == 0',
    '():=1+1',
    `(x) :=
      x*x`
  ])

  cantParseInlineFunction([
    '(numero) := numero = 0',
    '(numero) := retornar 0',
    '(x) : = x*2'
  ])
})

test('parse conditional expression', (): void => {
  const canParseConditionalExpression = canParse(ConditionalExpression)
  const cantParseConditionalExpression = cantParse(ConditionalExpression)

  canParseConditionalExpression([
    'se 5 > 4 entao 0 senao -1',
    'se confuso igual a verdadeiro entao "nani"',
    'se soma entao (x) := x+x senao funcao (x) retornar x*x fim',
    'se foo > 5 entao "maior que 5"'
  ])
  cantParseConditionalExpression([
    'se 5 > 4 ? 0 : -1',
    '"nani" se confuso senao',
    'falso se confuso expr',
    '0 senao confuso',
    'se confuso 0 senao -1'
  ])
})
