import { Statement } from '../../src/parsers/statements'
import { generatorTester, assignRhs } from '../utils'


test('generate function call and return statements', (): void => {
  const tryGenerateStatement = generatorTester(Statement)

  tryGenerateStatement([
    ['retornar 0', 'return 0'],
    ['retornar funcao() retornar x fim', 'return function(){\nreturn x}'],
    ['validar()', 'validar()\n'],
    ['inserir(x: 5)', 'inserir(5)\n'],
    ['inserir(numero: 5, na_lista: impares)', 'inserir(5,impares)\n']
  ])
})

test('generate while statement', (): void => {
  const tryGenerateStatement = generatorTester(Statement)

  tryGenerateStatement([
    ['soma = 0', `let soma = ${assignRhs('0')}`],
    ['i = 10', `let i = ${assignRhs('10')}`],
    ['idade = 10', `let idade = ${assignRhs('10')}`],
    ['exibir_mensagem_censura = ""', `let exibir_mensagem_censura = ${assignRhs('""')}`],
    ['treta = verdadeiro', `let treta = ${assignRhs('true')}`],
    ['enquanto i > 0 faca i = i - 1 fim', `while(i>0){\ni = ${assignRhs('i-1')}}`],
    ['enquanto i <= 10 faca soma = soma + i fim', `while(i<=10){\nsoma = ${assignRhs('soma+i')}}`],
    ['enquanto idade < 18 faca exibir_mensagem_censura = verdadeiro fim',
     `while(idade<18){\nexibir_mensagem_censura = ${assignRhs('true')}}`],
    [`
      enquanto treta != falso
      faca
        treta = verdadeiro
      fim
      `,
      `while(treta!=false){\ntreta = ${assignRhs('true')}}`
    ]
  ])
})

test('generate do while statement', (): void => {
  const tryGenerateStatement = generatorTester(Statement)

  tryGenerateStatement([
    ['faca i = i - 1 enquanto i > 0 fim', `do{\ni = ${assignRhs('i-1')}}while(i>0)`],
    ['faca soma = soma + i enquanto i <= 10 fim', `do{\nsoma = ${assignRhs('soma+i')}}while(i<=10)`],
    [`
      faca
        treta = verdadeiro
      enquanto treta != falso
      fim
      `,
      `do{\ntreta = ${assignRhs('true')}}while(treta!=false)`
    ]
  ])

})

test('generate foreach statement', (): void => {
  const tryGenerateStatement = generatorTester(Statement)

  tryGenerateStatement([
    ['total = 0', `let total = ${assignRhs('0')}`],
    ['para cada elemento de colecao faca soma=soma+elemento fim',
     `for(const elemento of colecao){\nsoma = ${assignRhs('soma+elemento')}}`],
    [
    `para cada i de lista faca
      para cada j de lista faca
        total = i + j
      fim
    fim`,
    `for(const i of lista){\nfor(const j of lista){\ntotal = ${assignRhs('i+j')}}}`
    ]
  ])
})

test('generate if then else statement', (): void => {
  const tryGenerateStatement = generatorTester(Statement)

  tryGenerateStatement([
    ['peso = 70.6', `let peso = ${assignRhs('70.6')}`],
    ['x = 0', `let x = ${assignRhs('0')}`],
    ['y = 0', `let y = ${assignRhs('0')}`],
    ['se peso < 0 entao peso = 0 fim', `if(peso<0){\npeso = ${assignRhs('0')}}`],
    ['se peso < 0 entao peso = 0 senao peso = 1 fim', `if(peso<0){\npeso = ${assignRhs('0')}}else{\npeso = ${assignRhs('1')}}`],
    ['se x igual a 0 entao y = 0 senaose x igual a 1 entao y = 1 senao y = 10 fim',
     `if(x==0){\ny = ${assignRhs('0')}}else if(x==1){\ny = ${assignRhs('1')}}else{\ny = ${assignRhs('10')}}`
    ],
    ['se x igual a 0 entao y = 0 senaose x igual a 1 entao y = 1 fim',
     `if(x==0){\ny = ${assignRhs('0')}}else if(x==1){\ny = ${assignRhs('1')}}`
    ]
  ])
})
