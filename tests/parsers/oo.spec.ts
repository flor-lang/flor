import { canParse, cantParse } from '../utils'
import { InterfaceDeclaration, ClassDeclaration, ClassInstantiation } from '../../src/parsers/oo'

test('parse interface declaration', (): void => {
  const canParseInterfaceDeclaration = canParse(InterfaceDeclaration)
  const cantParseInterfaceDeclaration = cantParse(InterfaceDeclaration)

  canParseInterfaceDeclaration([
    'definir interface Teste foo bar fim',
    `
    definir interface Nomeavel
      nome idade endereco
    fim
    `,
    `
    definir interface Nomeavel
      nome
    fim
    `,
    `
    definir interface Pessoa
      nome
      idade
      endereco
    fim
    `
  ])
  cantParseInterfaceDeclaration([
    'definir interface fim',
    'definir interface Vazio fim',
    'interface NaoDefinida var fim',
    'definir interface Foo bar',
    'definir Foo bar fim',
    // can be changed in future
    `
    definir interface ComMetodo
      nome
      executando()
    fim
    `
  ])
})

test('parse class declaration', (): void => {
  const canParseClassDeclaration = canParse(ClassDeclaration)
  const cantParseClassDeclaration = cantParse(ClassDeclaration)

  canParseClassDeclaration([
    `
    definir classe PessoaFisica
      heranca: Pessoa
      interfaces: Nomeavel Localizavel
    fim
    `,
    `
    definir classe Carro
      propriedades:
        privado modelo
        marca
        construtora
        estatico ano = 2020
    
      construtor: funcao (modelo)
        __modelo = modelo
      fim
    fim
    `,
    `
    definir classe Luz
      metodos:
        ligar = funcao () __ligado = verdadeiro fim
        desligar = funcao () __ligado = falso fim
        privado esta_ligado = () := __ligado igual a verdadeiro
    fim
    `
  ])

  cantParseClassDeclaration([
    `
    definir classe PessoaFisica
      heranca: Pessoa
      heranca: Outro
    fim
    `
  ])
})


test('parse interface declaration', (): void => {
  const canParseClassInstantiation = canParse(ClassInstantiation)
  const cantParseClassInstantiation = cantParse(ClassInstantiation)

  canParseClassInstantiation([
    'novo Humano()',
    'nova Pessoa()',
    'novo Jogador(nome: "Baxola", camisa: 10)'
  ])

  cantParseClassInstantiation([
    'novoHumano()',
    'nova Pessoa'  
  ])
})