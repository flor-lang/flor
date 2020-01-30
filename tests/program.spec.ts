import { canParse, cantParse } from './utils'
import { Block, Program } from '../src/parsers/program'

test('test block', (): void => {
  const canParseBlock = canParse(Block)
  const cantParseBlock = cantParse(Block)

  canParseBlock([
    'x = 0 y = 2 z = 5',
    `
    para i de 0 ate tamanho_lista - 1 faca
      para j de 1 ate tamanho_lista - 1 faca
        se lista[j] < lista[j-1] entao
          aux = lista[j-1]
          lista[j-1] = lista[j]
          lista[j] = aux
        fim
      fim
    fim
    `
  ])

  cantParseBlock([
    'x=0 x>5'
  ])
})


test('test program', (): void => {
  const canParseProgram = canParse(Program, true)
  const cantParseProgram = cantParse(Program)

  canParseProgram([
    `
    i = 1
    soma = 0
    enquanto i <= 10 faca
      soma = soma + i
      i = i + 1
    fim
    soma = soma
    `
  ])

  cantParseProgram([
    'x=0 x>5 fim'
  ])
})
