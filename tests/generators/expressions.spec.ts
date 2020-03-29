import { expressionCG, ExpressionNode } from '../../src/generator/expressions'
import { Expression } from '../../src/parsers/expressions'

test('generate literal code', (): void => {
  const astLiteralNumber = Expression.tryParse('10')
  const resultNumber = expressionCG((astLiteralNumber as unknown) as ExpressionNode)

  expect(resultNumber).toBe('10')

  const astLiteralString = Expression.tryParse('"Teste"')
  const resultString = expressionCG((astLiteralString as unknown) as ExpressionNode)

  expect(resultString).toBe('"Teste"')

  const astLiteralTrueBool = Expression.tryParse('verdadeiro')
  const resultTrueBool = expressionCG((astLiteralTrueBool as unknown) as ExpressionNode)

  expect(resultTrueBool).toBe('true')

  const astLiteralFalseBool = Expression.tryParse('falso')
  const resultFalseBool = expressionCG((astLiteralFalseBool as unknown) as ExpressionNode)
  
  expect(resultFalseBool).toBe('false')
})
