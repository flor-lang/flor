import { Statement } from '../../src/parsers/statements'
import { generatorTester } from '../utils'


test('generate function call and return statements', (): void => {
  const tryGenerateStatement = generatorTester(Statement)

  tryGenerateStatement([
    ['retornar 0', 'return 0'],
    ['retornar funcao() retornar x fim', 'return function(){\\nreturn x}'],
    ['validar()', 'validar()'],
    ['inserir(x: 5)', 'inserir(5)'],
    ['inserir(numero: 5, na_lista: impares)', 'inserir(5,impares)']
  ])
})

test('generate while statement', (): void => {
  const tryGenerateStatement = generatorTester(Statement, true, 0)

  tryGenerateStatement([
    ['enquanto i > 0 faca i = i - 1 fim', 'while(i>0){\\ni = i-1\\n}'],
    ['enquanto i <= 10 faca soma = soma + i fim', 'while(i<=10){\\nsoma = soma+i\\n}'],
    ['enquanto idade < 18 faca exibir_mensagem_censura = verdadeiro fim',
     'while(idade<18){\\nexibir_mensagem_censura = true\\n}'],
    [`
      enquanto treta != falso
      faca
        treta = verdadeiro
      fim
      `,
      'while(treta!=false){\\ntreta = true\\n}'
    ]
  ])
})
