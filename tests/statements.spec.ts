import { canParse, cantParse } from './utils'
import { Statement, IfThenElseStatement } from '../src/parsers/statements'

test('if then else statement', (): void => {
  const canParseIfThenElseStatement = canParse(IfThenElseStatement)
  const cantParseIfThenElseStatement = cantParse(IfThenElseStatement)

  canParseIfThenElseStatement([
    'se peso < 0 entao peso = 0 fim',
    'se (altura > 1.80 e peso > 80) entao mensagem = "Voce é bem grande" fim',
    'se ativo entao ativo = falso fim',
    'se ativo entao ativo = falso  fim ',
    'se valor diferente de nulo entao valor = valor / 5 fim',
    'se maciel == godofredo ou sandro igual a filomeno entao cassia = passolargo fim',
    'se condicao igual a verdadeiro entao condicao_satisfeita = verdadeiro senao condicao_satisfeira = falso fim',
    `
    se divida_atual - valor_pago > 0 entao
      mensagem = "Ainda restam contas a pagar"
    fim
    `,
    `
    se divida_atual igual a 0 entao
      mensagem = "Não há dividas"
    senao
      mensagem = "Cliente necessita prestar contas"
    fim
    `,
    `
    se divida_atual igual a 0 entao
      se cliente_possui_pendencias igual a falso entao mensagem = "Não há dividas" fim
    senao
      mensagem = "Cliente necessita prestar contas"
    fim
    `
  ])
  cantParseIfThenElseStatement([
    'se fim entao se fim',
    'se peso < 0 entao peso = 0',
    'se peso < 0 peso = 0 fim',
    'se ativo entao fim',
    'se fim entao a = 0 fim',
    'se a = 0 entao a = 0 fim',
    'se a entao b',
    'se a > 0 senao a = 0 fim',
    'se 5 == 0 entao a = 0 senao fim',
    'se 5 == 0 entao senao a = 0 fim',
    'se verdadeiro entao a = 5senao a = afim',
    'se igual a entao a=0 fim'
  ])
})

test('parse statement', (): void => {
  const canParseStatement = canParse(Statement)
  const cantParseStatement = cantParse(Statement)

  canParseStatement([])
  cantParseStatement([])
})
