import { semanticTester } from "../utils"


test('test variable definition', () => {
  const definition = semanticTester(/.*Váriavel '.+' não foi definida/)
  definition([
    'valor = teste',
    'valor = valor',
    'cinco = cinco',
    `
    dois = 2
    dez = dois + oito
    `
  ])
})