import { canParse, cantParse } from './utils'
import { Block, Program } from '../src/parsers/program'

test('test block', (): void => {
  const canParseBlock = canParse(Block, true)
  const cantParseBlock = cantParse(Block)

  canParseBlock([
    'x = 0 y = 2 z = 5'
  ])

  cantParseBlock([
    'x=0 x>5'
  ])
})
