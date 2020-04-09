import { Statement } from '../../src/parsers/statements'
import { generatorTester } from '../utils'


test('generate basic statement code', (): void => {
  const tryGenerateStatement = generatorTester(Statement, true, 1)

  tryGenerateStatement([
    ['retornar 0', 'return 0'],
    ['validar()', 'validar()'],
    ['inserir(x: 5)', 'inserir(5)'],
    ['inserir(numero: 5, na_lista: impares)', 'inserir(5,impares)'],
  ])
})
