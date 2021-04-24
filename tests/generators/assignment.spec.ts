import { Assignment } from '../../src/parsers/assignment'
import { Program } from '../../src/parsers/program'
import { generatorTester, assignRhs } from '../utils'


test('test identifier', () => {
  const tryGenerateIdentifier = generatorTester(Assignment)

  tryGenerateIdentifier([
    ['variavel = nulo', `let variavel = ${assignRhs('null')}`],
    ['teste = super.ola()', `let teste = ${assignRhs('super.ola()\n')}`],
    ['variavel = 0', `variavel = ${assignRhs('0')}`],
    ['teste = super.ola()', `teste = ${assignRhs('super.ola()\n')}`],
    ['teste = super()', `teste = ${assignRhs('super()\n')}`],
    ['#variavel = "teste"', `this.variavel = ${assignRhs('"teste"')}`],
    ['while = "teste"', `let while_ = ${assignRhs('"teste"')}`],
  ])
});

test('test assignment', () => {
  const tryGenerateAssignment = generatorTester(Assignment)

  tryGenerateAssignment([
    ['somar = nulo', `let somar = ${assignRhs('null')}`],
    ['variavel = 1', `variavel = ${assignRhs('1')}`],
    ['variavel = verdadeiro', `variavel = ${assignRhs('true')}`],
    ['somar = (x) := x + y', `somar = ${assignRhs('(x=null) => __pf__.add(x,\'+\',y)')}`],
    ['somar = funcao(x, y) soma = x + y fim', `somar = ${assignRhs(`function(x=null,y=null){\nlet soma = ${assignRhs('__pf__.add(x,\'+\',y)')}}`)}`],
    ['somar = funcao(x, y) retornar x + y fim', `somar = ${assignRhs('function(x=null,y=null){\nreturn __pf__.add(x,\'+\',y)}')}`],
    ['somar = se 5 > 0 entao (x) := x + y', `somar = ${assignRhs('__pf__.cdt_expr(somar,5>0,(x=null) => __pf__.add(x,\'+\',y),)')}`],
    ['teste = se verdadeiro entao 1 senao -1', `teste = ${assignRhs('__pf__.cdt_expr(teste,true,1,(-1))')}`],
  ])
});

test('test assignment with program', () => {
  const tryGenerateAssignment = generatorTester(Program)

  tryGenerateAssignment([
    ['id = nulo', `let id = ${assignRhs('null')}`],
    ['id = 0 variavel = id', `id = ${assignRhs('0')}variavel = ${assignRhs('id')}`]
  ])
});
