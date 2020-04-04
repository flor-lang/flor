import { generatorTester } from '../utils'
import { Expression } from '../../src/parsers/expressions'
import { expressionCG } from '../../src/backend/generator/expressions'

test('generate literal code', (): void => {

  const tryGenerateExpressions = generatorTester(Expression, expressionCG)

  tryGenerateExpressions([
    ['10', '10'],
    ['"Teste"', '"Teste"'],
    ['verdadeiro', 'true'],
    ['falso', 'false'],
    ['nulo', 'null'],
    ['[0, 1, 2]', '[0,1,2]'],
    ['[0, "Teste", falso, nulo]', '[0,"Teste",false,null]'],
    ['{"chave": "valor"}', '{"chave":"valor"}'],
    ['{"chave": 10}', '{"chave":10}'],
    ['{ "chave" : [0] }', '{"chave":[0]}'],
  ])
})
