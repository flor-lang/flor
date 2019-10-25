import { Assignment, Loc, Identifier } from '../src/parsers/assignment'
import { canParse, cantParse } from './utils'
import { Literal } from '../src/parsers/literals'

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
    'a = 20',
    'b=verdadeiro',
    '_c = "string"',
    'op=nulo'
  ])

  cantParseAssignment([
    '_ = "something"',
    '_ = _',
    'identifier = identifier',
    'nulo = nulo',
    '"string" = nulo'
  ])
})

test('parse identifier', (): void => {
  const canParseIdentifier = canParse(Identifier)
  const cantParseIdentifier = cantParse(Identifier)

  canParseIdentifier(['a','_variavel','x1','snake_case'])
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
