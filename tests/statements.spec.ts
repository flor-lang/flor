import { canParse, cantParse } from './utils'
import { Statement, IfThenElseStatement, WhileStatement, DoWhileStatement, ForEachStatement, ForToStatement, ReturnStatement, FunctionCall } from '../src/parsers/statements'

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
    // 'se ativo entao fim',
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

test('while statement', (): void => {
  const canParseWhileStatement = canParse(WhileStatement)
  const cantParseWhileStatement = cantParse(WhileStatement)
  
  canParseWhileStatement([
    'enquanto i > 0 faca i = i - 1 fim',
    'enquanto i <= 10 faca soma = soma + i fim',
    'enquanto idade < 18 faca exibir_mensagem_censura = verdadeiro fim',
    `
    enquanto treta != falso
    faca
      treta = verdadeiro
    fim
    `,
    `
    enquanto i > 0 faca
      se i % 2 igual a 0 entao
        pares[i] = i
      fim
    fim
    `
  ])
  cantParseWhileStatement([
    'faca i = i - 1 enquanto verdadeiro',
    'enquanto se 5 == 5 entao a = 1 fim faca i < 0 fim',
    'enquanto a = 1 fim',
    'enquanto a = 1 faca a = 0 fim',
    'enquanto faca fim'
  ])
})

test('do while statement', (): void => {
  const canParseDoWhileStatement = canParse(DoWhileStatement)
  const cantParseDoWhileStatement = cantParse(DoWhileStatement)
  
  canParseDoWhileStatement([
    'faca i = i - 1 enquanto verdadeiro fim',
    'faca v[i] = v[i+1] enquanto i < a_tamanho - 1 fim',
    'faca v = 0 enquanto v fim',
    'faca se v entao v=falso senao v=verdadeiro fim enquanto v != falso fim',
    `
    faca
      se i % 2 igual a 0 entao
        j = j-1
      fim
    enquanto i < j
    fim
    `
  ])
  cantParseDoWhileStatement([
    'enquanto x faca x = 0 fim',
    // 'faca x enquanto x fim',
    // 'faca enquanto 0 == 0 fim',
    'faca x = a enquanto x == x',
    'faca x = 2 enquanto fim',
    'x=2 enquanto x fim',
    'faca x = "" x != nulo fim'
  ])
})

test('parse for each', (): void => {
  const canParseForEachStatement = canParse(ForEachStatement)
  const cantParseForEachStatement = cantParse(ForEachStatement)

  canParseForEachStatement([
    'para cada elemento de colecao faca soma=soma+elemento fim',
    'para cada i de lista_numeros faca lista_numeros[i] = i + 1 fim',
    // 'para cada troll de trolls1 + trolls2 faca trolls3 = troll + troll fim',
    `
    para cada elemento de colecao faca
      soma = soma + elemento
    fim
    `,
    `
    para cada i de lista faca
      para cada j de lista faca
        total = i + j
      fim
    fim
    `
  ])

  cantParseForEachStatement([
    'paracada elemento de colecao faca soma=soma+elemento fim',
    'para cada troll de trolls1 + trolls2 faca troll + troll fim',
    'para cada 5 de lista_numeros faca lista_numeros[i] = i + 1 fim',
    'para cada a + b de lista_numeros faca lista_numeros[i] = i + 1 fim',
    'para cada 5 de lista_numeros=1 faca lista_numeros[i] = i + 1 fim',
    `
    para elemento de colecao faca
      soma = soma + elemento
    fim
    `
  ])
})

test('parse for to', (): void => {
  const canParseForToStatement = canParse(ForToStatement)
  const cantParseForToStatement = cantParse(ForToStatement)

  canParseForToStatement([
    'para i de 1 ate 10 faca print = i fim',
    'para x de 0 ate 20 com passo 2 faca print = x fim',
    'para y de 100 ate 0 com passo -1 -5 faca print = y fim',
    'para i de inicio ate final com passo de_dois_em_dois faca teste = "teste" fim',
    // to do swap operation i need to block parser implemented
    `
    para i de 0 ate tamanho_lista - 1 faca
      para j de 1 ate tamanho_lista - 1 faca
        se lista[j] < lista[j-1] entao
          swap = lista[j] + lista[j-1]
        fim
      fim
    fim
    `
  ])

  cantParseForToStatement([
    'para cada i de 2 ate 30 faca f = 4 fim',
    'para 5 de i ate 10 faca alguma = "coisa" fim',
    'paraide1ate10 faca oi = 0 fim',
    'para i = 0 ate 2 faca a = 0 fim',
    'para i de 3 ate 10 com passo faca a = 0 fim',
  ])
})

test('parse return statement', (): void => {
  const canParseStatement = canParse(ReturnStatement)
  const cantParseStatement = cantParse(ReturnStatement)

  canParseStatement([
    'retornar 0',
    'retornar (5 + 2) * 10',
    'retornar verdadeiro >= 0',
    'retornar aux',
    'retornar "string"',
    'retornar funcao() retornar x fim',
    'retornar'
  ])
  cantParseStatement([
    'retornar retornar',
    'retornar enquanto 0 faca x = 0 fim',
    'retornar x = 0'
  ])
})

test('parse function call', (): void => {
  const canParseFunctionCall = canParse(FunctionCall)
  const cantParseFunctionCall = cantParse(FunctionCall)

  canParseFunctionCall([
    'ordenar ()',
    'duplicar (x: 2)',
    'somar(x: 0, y: 0)',
    'subtrair(x:x,y:y)'
  ])
  cantParseFunctionCall([
    'inserir(x)',
    'inserir(0)'
  ])
})

test('parse statement', (): void => {
  const canParseStatement = canParse(Statement)
  const cantParseStatement = cantParse(Statement)

  canParseStatement([])
  cantParseStatement([])
})
