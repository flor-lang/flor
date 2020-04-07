import Env from '../../src/enviroment/env'
import { visitor } from '../../src/backend/visitor'
import { traverser } from '../../src/backend/traverse'
import { Program } from '../../src/parsers/program'
import { generatorTester } from '../utils'

test('test assignment', () => {
  const tryGenerateExpressions = generatorTester(Program, true, 0)

  tryGenerateExpressions([
    ['variavel = 1', 'variavel = 1\\n']
  ])
});
