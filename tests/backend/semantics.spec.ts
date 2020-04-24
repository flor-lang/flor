import { semanticTester } from "../utils"

test('test variable definition and your use', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true, /.*Váriavel '.+' não foi definida/)

  mustBeAllowed([
    `valor = 5
    cinco = valor`,
    `valor = 5
    valor = valor`,
    `valor = 5
    se valor > 0 entao
      valor = 10
    fim`,
    'em_linha = (x) := 2*x',
    `hey_listen = funcao (parametro)
      retornar "Hey " + parametro + " listen!"
    fim`
  ])

  mustThrows([
    'valor = teste', 'valor = valor', 'cinco = cinco', 'in = () := 2*x',
    `dois = 2
    dez = dois + oito`,
    `duplicar = (x) := 2*x
    aux = x`,
    `
    se 5 > 0 entao
      teste = "aux"
    fim
    teste = teste
    `,
    `definir classe Teste
        propriedades: valor = 0
    fim
    teste = #valor`
  ])
})

test('test function call use', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true, /.*Função '.+' não foi definida/)

  mustBeAllowed([
    `ola = () := "Olá Mundo!"
    ola()
    `,
    `hey = (x) := x
    listen = hey(x: 0)
    `,
    `duplicar = (x) := 2*x
    se 5 < 10 entao
      duplicar(x: 10)
    fim
    `
  ])

  mustThrows([
    'valor()', 'duplicar(x: 10)', 'treta(x: 5, y: 10)',
    `duplicar = (x) := 2*x
    triplicar(x: 10)`,
    `
    aux = funcao ()
      funcao_interna = (x) := x
    fim
    funcao_interna(x: 0)
    `
  ])
})

test('test class member identifier use', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true, /.*Operadores \[#, super\] não podem ser usados fora da definição de uma classe/)

  mustThrows([
    '#propriedade = 0', '#metodo = () := 0',
    `definir classe Teste
        propriedades: valor = 0
    fim
    #valor = 1`
  ])

  mustBeAllowed([
    `definir classe Teste
        propriedades: valor = 0 duplicado
        construtor: funcao ()
          #duplicado = #valor * 2
        fim
    fim`
  ])
})
