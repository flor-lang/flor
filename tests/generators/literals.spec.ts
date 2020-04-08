import Env from '../../src/enviroment/env'
import { visitor } from '../../src/backend/visitor'
import { traverser } from '../../src/backend/traverse'
import { Literal } from '../../src/parsers/literals'
import { generatorTester } from '../utils'

test('test assignment', () => {
  const tryGenerateLiterals = generatorTester(Literal, true, 9)

  tryGenerateLiterals([
    ['1', '1'],
    ['"opa"', '"opa"'],
    ['verdadeiro', 'true'],
    ['falso', 'false'],
    ['nulo', 'null'],
    ['[1, 2, 3]', '[1,2,3]'],
    ['[]', '[]'],
    ['{"vai": "filhao"}', '{"vai":"filhao"}'],
    ['{}', '{}'],
    ['{ "vai": "filhao", "troll": falso, "op": 10 }', '{"vai":"filhao","troll":false,"op":10}'],
  ])
});