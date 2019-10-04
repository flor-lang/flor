import { Assignment, Loc } from '../src/parsers/assignment'
import { canParse, cantParse } from './utils'

test('parse loc', (): void => {
  const canParseLoc = canParse(Loc)
  const cantParseLoc = cantParse(Loc)

  canParseLoc(['array[0]', 'arr[1][0]', 'arr[0]', 'arr[1]'])
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
    // 'nulo = nulo',
    '"string" = nulo'
  ])

  expect(Assignment.parse('message = "Hello World!"')).toMatchObject({
    status: true,
    value: {
      name: 'assignment',
      value: { identifier: 'message',  value: { 
        name: 'literal', value: { name: 'string', value: 'Hello World!' }
      }}
    }
  })
})
