import { Expression } from '../../src/parsers/expressions'
import { generatorTester } from '../utils'


test('generate basic expression code', (): void => {
  const tryGenerateExpressions = generatorTester(Expression)

  tryGenerateExpressions([
    ['identificador.key', 'identificador.key'],
    ['identificador["key"]', 'identificador["key"]'],
    ['identificador.chave["key"]', 'identificador.chave["key"]'],
    ['identificador', 'identificador'],
    ['!booleano', '(!booleano)'],
    ['-1', '(-1)'],
    ['1 + 1', '1+1'],
    ['2 - -1', '2-(-1)'],
    ['5 % 2', '5%2'],
    ['1 - 1', '1-1'],
    ['5 * 8', '5*8'],
    ['5 / 8', '5/8'],
    ['5 + 1 - 1 * 10', '5+1-1*10'],
    ['(5 + 1)', '(5+1)'],
    ['5 > 2', '5>2'],
    ['5 >= 2', '5>=2'],
    ['5 < 2', '5<2'],
    ['5 <= 2', '5<=2'],
    ['5 == 2', '5==2'],
    ['5 igual a 2', '5==2'],
    ['5 != 2', '5!=2'],
    ['5 diferente de 2', '5!=2'],
    ['verdadeiro ou falso', 'true||false'],
    ['verdadeiro e falso', 'true&&false']
  ])
})

test('generate expression function declaration', (): void => {
  const tryGenerateExpressions = generatorTester(Expression)

  tryGenerateExpressions([
    ['funcao(numero) numero = 0 fim', 'function(numero){\nnumero = 0;}'],
    ['funcao () numero = 0 fim', 'function(){\nnumero = 0;}'],
    ['funcao (x, y, z) x = y + z fim', 'function(x,y,z){\nx = y+z;}'],
    [
      `funcao (lista)
        aux = lista[0]
        lista[0] = lista[1]
        lista[1] = aux
      fim`,
      `function(lista){\naux = lista[0];lista[0] = lista[1];lista[1] = aux;}`
    ],
    ['(numero) := numero * 0', '(numero) => numero*0'],
    ['() := Pessoa', '() => Pessoa'],
    ['(x, y) :=  x + y', '(x,y) => x+y'],
    [`(x) :=
      x*x`,
      '(x) => x*x'
    ]
  ])
})
