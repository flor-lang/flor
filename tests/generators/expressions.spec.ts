import { expressionCG, ExpressionNode } from '../../src/generator/expressions'
import { Expression } from '../../src/parsers/expressions'
import { generatorTester } from '../utils'

test('generate literal code', (): void => {

  const tryGenerateExpressions = generatorTester(Expression, expressionCG, true, 6)

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
