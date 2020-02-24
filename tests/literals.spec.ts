import { canParse, cantParse } from './utils'
import { Literal, StringLiteral, ArrayLiteral } from '../src/parsers/literals'

test('parse string', (): void => {
  const canParseString = canParse(StringLiteral)
  canParseString([
    '"rafael"',
    '"com espaço"',
    '"l3tra e n1m3ros"',
    '"1 ex3mpl0 mu1t0 d@or@"'
  ])

  const cantParseString = cantParse(StringLiteral)
  cantParseString([
    'erro pq falta aspas',
  ])
})

test('parse array', (): void => {
  const canParseArray = canParse(ArrayLiteral)
  const cantParseArray = cantParse(ArrayLiteral)

  canParseArray([
    '[]',
    '[0]',
    '[0,1,2,3,4,5]',
    '["hello", "numero", 0]',
    '[5 + 2, valor, aleatorio()]'
  ])

  cantParseArray([
    '0, 2, 4',
    '(0,1,2,3,4,5)',
    '{0, 1}',
    '{"chave": "valor"}',
    '["chave": "valor"]'
  ])
})

test('parse literal', (): void => {
  const canParseLiteral = canParse(Literal)
  canParseLiteral([
    '"meu nome"',                 // String
    '10',                         // Integer
    '3.14',                       // Float
    'verdadeiro',                 // Boolean
    'falso',                      // Boolean
    'nulo'                        // Null
  ])

  const cantParseLiteral = cantParse(Literal)
  cantParseLiteral([
    'erro pq não é literal',
    '3.14.15', '3.', '.3'
  ])
})
