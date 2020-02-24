import { canParse, cantParse } from './utils'
import { Block, Program } from '../src/parsers/program'

test('test block', (): void => {
  const canParseBlock = canParse(Block)
  const cantParseBlock = cantParse(Block)

  canParseBlock([
    'x = 0 y = 2 z = 5',
    `teste = 0
    se espaco_extra igual a teste entao block_parser = "Succeed" fim`,
    // bubble sort
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
    'x=0 x>5',
    'a',
    ''
  ])
})


test('test program', (): void => {
  const canParseProgram = canParse(Program)
  const cantParseProgram = cantParse(Program)

  canParseProgram([
    // soma de 1 a 10
    `
    i = 1
    soma = 0
    enquanto i <= 10 faca
      soma = soma + i
      i = i + 1
    fim
    soma = soma
    `,
    // fatorial
    `
    valor = 5
    fatorial = 1

    se valor < 0 entao
      mensagem = "Valor não pode ser negativo"
    senao
      para i de 1 ate valor faca
        fatorial = fatorial * i
      fim
      mensagem = "O Fatorial de {valor} é {fatorial}"
    fim
      
    console_escrever = mensagem
    `,
    `
    duplicar = (valor) := valor * 2
    numero = ler()
    se numero igual a 0 entao
      escrever(texto: "O dobro de 0 é 0")
    senao
      escrever(texto: duplicar(valor: numero))
    fim
    `,
    // amostras = [3,4,2,10,3]
    // aux = [0,0,0,0,0,0,0]
    // saida = [0,0,0,0,0]
    `
    filtro_mediano = funcao (amostras, numero_de_amostras)
        aux[0] = amostras[0]
        aux[numero_de_amostras + 1] = amostras[numero_de_amostras - 1]
        para i de 1 ate numero_de_amostras faca
            aux[i] = amostras[i-1]
        fim
        para i de 0 ate numero_de_amostras - 1 faca
            amostras_ordenadas = ordenar(e1: aux[i], e2: aux[i+1], e3: aux[i+2])
            saida[i] = amostras_ordenadas[1]
        fim
    fim

    filtro_mediano(amostras: amostras, numero_de_amostras: 5)
    `
  ])

  cantParseProgram([
    'x=0 x>5 fim',
    '// comment are pre-processed',
    `
    i = 0
    se i == 0 entao
    fim
    `
  ])
})
