import Env from '../../src/enviroment/env'
import { visitor } from '../../src/backend/visitor'
import { traverser } from '../../src/backend/traverse'
import { Assignment } from '../../src/parsers/assignment'
import { Program } from '../../src/parsers/program'
import { generatorTester } from '../utils'

test('test assignment', () => {
  const tryGenerateAssignment = generatorTester(Assignment, true, 3)

  tryGenerateAssignment([
    ['variavel = 1', 'variavel = 1\\n'],
    ['variavel = verdadeiro', 'variavel = true\\n'],
    ['somar = (x) := x + y', 'somar = (x) => x+y\\n'],
    ['somar = funcao(x, y) soma = x + y fim', 'somar = function(x,y){\\nsoma = x+y\\n}\\n']
  ])
});

test('test assignment with program', () => {
  const tryGenerateAssignment = generatorTester(Program)

  tryGenerateAssignment([
    ['id = 0 variavel = id', 'id = 0\\nvariavel = id\\n']
  ])
});
