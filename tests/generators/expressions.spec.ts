import { expressionCG, ExpressionNode } from '../../src/generator/expressions'
import { Expression } from '../../src/parsers/expressions'
import { generatorTester } from '../utils'

test('generate literal code', (): void => {

  const tryGenerateExpressions = generatorTester(Expression, expressionCG, true, 4)

  tryGenerateExpressions([
    ['10', '10'],
    ['"Teste"', '"Teste"'],
    ['verdadeiro', 'true'],
    ['falso', 'false'],
    ['nulo', 'null']
  ])
})
