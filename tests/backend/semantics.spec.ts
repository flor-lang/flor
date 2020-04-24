import { semanticTester } from "../utils"

test('test variable definition and your use', () => {
  const definitionErrors = semanticTester(/.*Váriavel '.+' não foi definida/)
  definitionErrors([
    'valor = teste',
    'valor = valor',
    'cinco = cinco',
    'in = () := 2*x',
    `
    dois = 2
    dez = dois + oito
    `,
    `
    duplicar = (x) := 2*x
    aux = x
    `,
    `
    se 5 > 0 entao
      teste = "aux"
    fim
    teste = teste
    `
  ])
})

test('test function call use', () => {
  const definition = semanticTester(/.*Função '.+' não foi definida/)
  definition([
    'valor()',
    'duplicar(x: 10)',
    'treta(x: 5, y: 10)',
    `
    duplicar = (x) := 2*x
    triplicar(x: 10)
    `,
    `
    aux = funcao ()
      funcao_interna = (x) := x
    fim
    funcao_interna(x: 0)
    `
  ])
})
