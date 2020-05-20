import { ClassDeclaration, ClassInstantiation } from '../../src/parsers/oo'
import { generatorTester } from '../utils'

test('generate class declaration', (): void => {
  const tryGenerateClassDeclaration = generatorTester(ClassDeclaration)

  tryGenerateClassDeclaration([
    ['definir classe Pessoa fim',
    'class Pessoa{\nstatic __propertiesDeclarations__() {}constructor(){\nPessoa.__propertiesDeclarations__.bind(this)()\n}}\nPessoa.__propertiesDeclarations__.bind(null)()\n'],
    [
      `
      definir classe PessoaFisica
        heranca: Pessoa
        interfaces: Nomeavel Localizavel
      fim`  
    , 'class PessoaFisica extends Pessoa{\nstatic __propertiesDeclarations__() {}constructor(){\nsuper();\nPessoaFisica.__propertiesDeclarations__.bind(this)()\n}}\nPessoaFisica.__propertiesDeclarations__.bind(null)()\n'
    ],
    [
      `
      definir classe Carro
        propriedades:
          modelo = "Esportivo"
          marca
          construtora
          estatico ano = 2020
        construtor: funcao (marca)
          __marca = marca
        fim
      fim
      `,
      'class Carro{\nstatic __propertiesDeclarations__() {if (this) {this.modelo = \"Esportivo\"}\n' + 
      'if (this) {this.marca = null}\nif (this) {this.construtora = null}\nif (\'ano\' in Carro === false) {Carro.ano = 2020}\n}constructor(marca=null)' + 
      '{\nCarro.__propertiesDeclarations__.bind(this)()\nlet __marca = marca;}}\nCarro.__propertiesDeclarations__.bind(null)()\n'
    ],
    [
      `
      definir classe Luz
        propriedades: ligado = verdadeiro
        metodos:
          ligar = funcao () #ligado = verdadeiro fim
          desligar = funcao () #ligado = falso fim
          estatico esta_ligado = () := #ligado igual a verdadeiro
      fim
      `,
      'class Luz{\nstatic __propertiesDeclarations__() {if (this) {this.ligado = true}\n}constructor(){\nLuz.__propertiesDeclarations__.bind(this)()\n}' +
      'ligar(){\nthis.ligado = true;}desligar(){\nthis.ligado = false;} static esta_ligado(){ return this.ligado==true}}\nLuz.__propertiesDeclarations__.bind(null)()\n'
    ]
  ])
})

test('generate class instantiation', (): void => {
  const tryGenerateClassInstantiation = generatorTester(ClassInstantiation)

  tryGenerateClassInstantiation([
    ['novo Carro()', 'new Carro()\n'],
    ['novo Carro(nome: "Fusca")', 'new Carro("Fusca")\n'],
    ['nova Pessoa()', 'new Pessoa()\n'],
    ['nova Pessoa(nome: "Godofredo", idade: 18)', 'new Pessoa("Godofredo",18)\n']
  ])
})
