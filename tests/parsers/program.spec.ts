import { canParse, cantParse } from '../utils'
import { Block, Program } from '../../src/parsers/program'

test('test block', (): void => {
  const canParseBlock = canParse(Block)
  const cantParseBlock = cantParse(Block)

  canParseBlock([
    'x = 0 y = 2 z = 5',
    `teste = 0
    se espaco_extra igual a teste entao block_parser = "Succeed" fim`,
    // bubble sort
    // `
    // para i de 0 ate tamanho_lista - 1 faca
    //   para j de 1 ate tamanho_lista - 1 faca
    //     se lista[j] < lista[j-1] entao
    //       aux = lista[j-1]
    //       lista[j-1] = lista[j]
    //       lista[j] = aux
    //     fim
    //   fim
    // fim
    // `
  ])

  cantParseBlock([
    'x=0 x>5',
    'a'
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
    `
    amostras = [3,4,2,10,3]
    aux = [0,0,0,0,0,0,0]

    filtro_mediano = funcao (amostras, numero_de_amostras)
        saida = [0,0,0,0,0]
        aux[0] = amostras[0]
        aux[numero_de_amostras + 1] = amostras[numero_de_amostras - 1]
        retornar saida
    fim

    saida = filtro_mediano(amostras: amostras, numero_de_amostras: 5)
    escreva(lista: saida)
    `,
    `
    i = 0
    se i == 0 entao
    fim
    `,
    `
    definir interface Disputa
      time_a time_b
    fim
    
    definir classe Jogo
      interfaces: Disputa

      propriedades:
        time_a
        time_b
        numero_gols_a = 0
        numero_gols_b = 0
      
      construtor: funcao(time_a, time_b)
        __time_a = time_a
        __time_b = time_b
      fim

      metodos:
        marcar_gol = funcao(time)
          se time igual a __time_a entao
            __numero_gols_a = __numero_gols_a + 1
          senao
            __numero_gols_b = __numero_gols_b + 1
          fim
        fim

        texto = () := __time_a + ": " + __numero_gols_a + " | " + __time_b + ": " + __numero_gols_b
    fim

    jogo = novo Jogo(time_a: "Fortaleza", time_b: "Independiente")
    jogo.marcar_gol(time: "Fortaleza")
    escreva(texto: jogo)
    `
  ])

  cantParseProgram([
    'x=0 x>5 fim',
    '// comment are pre-processed'
  ])
})
