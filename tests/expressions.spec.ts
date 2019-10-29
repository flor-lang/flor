import { Factor, Unary, Term, Add, Rel, Equality, Join, Bool } from '../src/parsers/expression'
import { canParse, cantParse } from './utils'


test('parse factor', (): void => {
  const canParseFactor = canParse(Factor)
  const cantParseFactor = cantParse(Factor)

  canParseFactor(['5', '"5"', '(5)', '(-5 * 8)', '(1 ou 1)', 'verdadeiro', '(falso ou verdadeiro)', 'foo'])
  cantParseFactor(['5 - 1', '9 + - 3', '5 -1', 'verdadeiro ou falso'])
})

test('parse unary', (): void => {
  const canParseUnary = canParse(Unary)
  const cantParseUnary = cantParse(Unary)

  canParseUnary(['5', '-5', '+5', '-(-5)', '-foo', '-foo[bar]', '!(5 > 4)', '!verdadeiro'])
  cantParseUnary(['- 5', '-+5', '*5', '', 'foo!'])
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

test('can parse relation operation', (): void => {
  const canParseRel = canParse(Rel)
  const cantParseRel = cantParse(Rel)

  canParseRel(['5>2', '2 < 1', '5>=5', '2<=2', '5 >= (5+2)', '(1*1) <= (1/1)', '(1<=1)>(2>=1)', 'foo < arr[0]'])
  cantParseRel(['5>>2', '2=2', '3==3', '', '>', '<3<3', '5 < 4 < 3'])
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
