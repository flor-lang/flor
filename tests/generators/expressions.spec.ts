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
    ['funcao(numero) numero = 0 fim', 'function(numero=null){\nnumero = 0;}'],
    ['funcao () numero = 0 fim', 'function(){\nlet numero = 0;}'],
    ['funcao (x, y, z) x = y + z fim', 'function(x=null,y=null,z=null){\nx = y+z;}'],
    [
      `funcao (lista)
        aux = lista[0]
        lista[0] = lista[1]
        lista[1] = aux
      fim`,
      `function(lista=null){\nlet aux = lista[0];lista[0] = lista[1];lista[1] = aux;}`
    ],
    ['(numero) := numero * 0', '(numero=null) => numero*0'],
    ['() := Pessoa', '() => Pessoa'],
    ['(x, y) :=  x + y', '(x=null,y=null) => x+y'],
    [`(x) :=
      x*x`,
      '(x=null) => x*x'
    ]
  ])
})


test('generate coditional expression declaration', (): void => {
  const tryGenerateExpressions = generatorTester(Expression)
  const polyfilled = (code: string): string => `\nconst __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;\n${code}`
  
  tryGenerateExpressions([
    ['se verdadeiro entao 1 senao 0', polyfilled('__cdt_expr__(null,true,1,0)')],
    ['se nulo entao 1 senao 0', '__cdt_expr__(null,null,1,0)'],
    ['se 5 > 0 entao 1', '__cdt_expr__(null,5>0,1,)'],
    ['se 0 > 0 entao "hey"', '__cdt_expr__(null,0>0,"hey",)'],
  ])
})