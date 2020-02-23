import { Assignment, Loc, Identifier } from '../src/parsers/assignment'
import { canParse, cantParse } from './utils'
import { BlockFunction } from '../src/parsers/expressions'

test('parse loc', (): void => {
  const canParseLoc = canParse(Loc)
  const cantParseLoc = cantParse(Loc)

  canParseLoc(['array[0]', 'arr[1][0]', 'arr[0 / 0]', 'arr[1 + 1]', 'arr["troll"]', 'arr[falso]'])
  cantParseLoc(['array[]', '[]', '[][]', '[0]id'])
})

test('parse assignment operation', (): void => {
  const canParseAssignment = canParse(Assignment)
  const cantParseAssignment = cantParse(Assignment)

  canParseAssignment([
    'x = 20',
    'b=verdadeiro',
    '_c = "string"',
    'op=nulo',
    'arr[0] =falso',
    'x[0][0]= 0',
    'identifier = identifier',
    'foo = !((bar * 5) >= arr[index])'
  ])

  cantParseAssignment([
    '_ = "something"',
    '_ = _',
    'nulo = nulo',
    '"string" = nulo',
    '[0] = 5',
    'arr[] = "something"'
  ])
})

test('parse identifier', (): void => {
  const canParseIdentifier = canParse(Identifier)
  const cantParseIdentifier = cantParse(Identifier)

  canParseIdentifier(['x','_variavel','x1','snake_case'])
  cantParseIdentifier([
    '1',
    '&teste',
    'test§',
    '"meu nome"',
    'teste teste',
    'espaço',
    'verdadeiro',
    'falso',
    'nulo'
  ])
})

test('can parse block function loc', (): void => {
  const canParseBlockFunction = canParse(BlockFunction)
  const cantParseBlockFunction = cantParse(BlockFunction)

  canParseBlockFunction([
    'funcao (numero) numero = 0 fim',
    'funcao () c = "Olá Mundo" fim',
    `
    funcao (lista)
      aux = lista[0]
      lista[0] = lista[1]
      lista[1] = aux
    fim
    `,
    `
    funcao (x, y)
      aux = x * y
      aux = aux / 2
    fim
    `
  ])

  cantParseBlockFunction([
    'funcao(numero) numero = 0',
    '() x=0 fim',
    '(x) := x*x',
    'funcao ("") x = [] fim',
    'funcao (0) fim'
  ])
})
