import { Assignment } from '../src/parsers/assignment'
import { canParse, cantParse } from './utils'


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

  expect(
    Assignment.parse('message = "Hello World!"')
  ).toMatchObject({
    status: true,
    value: {
      name: 'assignment',
      value: { identifier: 'message',  value: { 
        name: 'literal', value: { name: 'string', value: 'Hello World!' }
      }}
    }
  })
})
