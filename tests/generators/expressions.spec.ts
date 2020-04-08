import { Expression } from '../../src/parsers/expressions'
import { generatorTester } from '../utils'


test('generate basic expression code', (): void => {
  const tryGenerateExpressions = generatorTester(Expression, true, 9)

  tryGenerateExpressions([
    ['identificador.key', 'identificador.key'],
    ['identificador["key"]', 'identificador["key"]'],
    ['identificador.chave["key"]', 'identificador.chave["key"]'],
    ['identificador', 'identificador'],
    ['1 + 1', '1+1'],
    ['1 - 1', '1-1'],
    ['5 * 8', '5*8'],
    ['5 / 8', '5/8'],
    ['5 + 1 - 1 * 10', '5+1-1*10'],
    ['(5 + 1)', '(5+1)']
  ])
})
