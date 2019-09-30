import { Factor, Unary, Term, Add } from '../src/parsers/expression'
import { canParse, cantParse } from './utils'


test('parse factor', (): void => {
  const canParseAssignment = canParse(Factor)
  const cantParseAssignment = cantParse(Factor)

  canParseAssignment([
    '5',
    '(5)',
    '(-5 * 8)',
  ])

  cantParseAssignment([
    '"5"',
    '5 - 1',
    '9 + - 3',
    '5 -1'
  ])

  expect(
    Factor.parse('5')
  ).toMatchObject({
    status: true,
    value: {
      name: 'factor',
      value: { name: 'number', value: 5 }
    }
  })
})
