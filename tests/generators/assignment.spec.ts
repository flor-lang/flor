import { Assignment } from '../../src/parsers/assignment'
import { Program } from '../../src/parsers/program'
import { generatorTester } from '../utils'


test('test identifier', () => {
  const tryGenerateIdentifier = generatorTester(Assignment)

  tryGenerateIdentifier([
    ['variavel = nulo', 'let variavel = null;'],
    ['teste = super.ola()', 'let teste = super.ola()\n;'],
    ['variavel = 0', 'variavel = 0;'],
    ['teste = super.ola()', 'teste = super.ola()\n;'],
    ['teste = super()', 'teste = super()\n;'],
    ['#variavel = "teste"', 'this.variavel = "teste";'],
    ['while = "teste"', 'let while_ = "teste";'],
  ])
});

test('test assignment', () => {
  const tryGenerateAssignment = generatorTester(Assignment)
  const polyfilled = (code: string): string => `\nconst __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;\n${code}`

  tryGenerateAssignment([
    ['somar = nulo', 'let somar = null;'],
    ['variavel = 1', 'variavel = 1;'],
    ['variavel = verdadeiro', 'variavel = true;'],
    ['somar = (x) := x + y', 'somar = (x=null) => x+y;'],
    ['somar = funcao(x, y) soma = x + y fim', 'somar = function(x=null,y=null){\nlet soma = x+y;};'],
    ['somar = funcao(x, y) retornar x + y fim', 'somar = function(x=null,y=null){\nreturn x+y};'],
    ['somar = se 5 > 0 entao (x) := x + y', polyfilled('somar = __cdt_expr__(somar,5>0,(x=null) => x+y,);')],
    ['teste = se verdadeiro entao 1 senao -1', 'teste = __cdt_expr__(teste,true,1,(-1));'],
  ])
});

test('test assignment with program', () => {
  const tryGenerateAssignment = generatorTester(Program)

  tryGenerateAssignment([
    ['id = nulo', 'let id = null;'],
    ['id = 0 variavel = id', 'id = 0;variavel = id;']
  ])
});
