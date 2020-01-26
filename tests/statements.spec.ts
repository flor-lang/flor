import { canParse, cantParse } from './utils'
import { Statement } from '../src/parsers/statement'

test('parse statement', (): void => {
  const canParseFactor = canParse(Statement)
  const cantParseFactor = cantParse(Statement)

  canParseFactor([])
  cantParseFactor([])
})
