import { Assignment } from '../../src/parsers/assignment'
import { Program } from '../../src/parsers/program'
import { generatorTester } from '../utils'


test('test identifier', () => {
  const tryGenerateIdentifier = generatorTester(Assignment)

  tryGenerateIdentifier([
    ['variavel = 0', 'variavel = 0\n'],
    ['teste = super.ola()', 'teste = super.ola()\n'],
    ['teste = super()', 'teste = super()\n'],
    ['#variavel = "teste"', 'this.variavel = "teste"\n'],
  ])
});

test('test assignment', () => {
  const tryGenerateAssignment = generatorTester(Assignment)

  tryGenerateAssignment([
    ['variavel = 1', 'variavel = 1\n'],
    ['variavel = verdadeiro', 'variavel = true\n'],
    ['somar = (x) := x + y', 'somar = (x) => x+y\n'],
    ['somar = funcao(x, y) soma = x + y fim', 'somar = function(x,y){\nsoma = x+y\n}\n'],
    ['somar = funcao(x, y) retornar x + y fim', 'somar = function(x,y){\nreturn x+y}\n']
  ])
});

test('test assignment with program', () => {
  const tryGenerateAssignment = generatorTester(Program)

  tryGenerateAssignment([
    ['id = 0 variavel = id', 'id = 0\nvariavel = id\n']
  ])
});
