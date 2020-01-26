import { canParse, cantParse } from './utils'
import { Statement, IfStatement } from '../src/parsers/statement'

test('if statement', (): void => {
  const canParseIfStatement = canParse(IfStatement)
  const cantParseIfStatement = cantParse(IfStatement)

  canParseIfStatement([
    'se peso < 0 entao peso = 0 fim',
    'se (altura > 1.80 e peso > 80) entao mensagem = "Voce é bem grande" fim',
    'se ativo entao ativo = falso fim',
    'se divida_atual - valor_pago > 0 entao mensagem = "Ainda restam contas a pagar" fim ',
    `
      se ativo entao
        ativo = falso
      fim
    `
  ])
  cantParseIfStatement([
    'se fim entao se fim',
    'se peso < 0 entao peso = 0',
    'se peso < 0 peso = 0 fim',
    'se ativo entao fim',
    'se fim entao a = 0 fim',
    'se a = 0 entao a = 0 fim'
  ])
})

test('parse statement', (): void => {
  const canParseStatement = canParse(Statement)
  const cantParseStatement = cantParse(Statement)

  canParseStatement([])
  cantParseStatement([])
})
