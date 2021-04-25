import { ClassDeclaration, ClassInstantiation, InterfaceDeclaration } from '../../src/parsers/oo'
import { generatorTester, assignRhs } from '../utils'

test('generate class declaration', (): void => {
  const tryGenerateClassDeclaration = generatorTester(ClassDeclaration)

  tryGenerateClassDeclaration([
    ['definir classe Pessoa fim',
    'class Pessoa{\nstatic __propertiesDeclarations__() {}constructor(){\nPessoa.__propertiesDeclarations__.bind(this)()\n}}\nPessoa.__propertiesDeclarations__.bind(null)()\nPessoa.__attr__ = []\n'],
    [
      `
      definir classe PessoaFisica
        heranca: Pessoa
        interfaces: Nomeavel Localizavel
      fim`  
    , 
    `__pf__.validateInheritance(Pessoa, 'Pessoa')\n` +
    `__pf__.validateInterface(Nomeavel, 'Nomeavel')\n` +
    `__pf__.validateInterface(Localizavel, 'Localizavel')\n` +
    'class PessoaFisica extends Pessoa{\nstatic __propertiesDeclarations__() {}constructor(){\nsuper();\nPessoaFisica.__propertiesDeclarations__.bind(this)()\n}}\nPessoaFisica.__propertiesDeclarations__.bind(null)()\n' +
      `PessoaFisica.__attr__ = []\n__pf__.validateInterfaceImpl('PessoaFisica', Nomeavel, PessoaFisica.__attr__)\n__pf__.validateInterfaceImpl('PessoaFisica', Localizavel, PessoaFisica.__attr__)\n`
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
      `class Carro{\nstatic __propertiesDeclarations__() {if (this && this.modelo === undefined) {this.modelo = ${assignRhs('"Esportivo"').slice(0, -1)}}\n` + 
      `if (this && this.marca === undefined) {this.marca = null}\nif (this && this.construtora === undefined) {this.construtora = null}\nif (\'ano\' in Carro === false) {Carro.ano = ${assignRhs('2020').slice(0, -1)}}\n}constructor(marca=null)` + 
      `{\nCarro.__propertiesDeclarations__.bind(this)()\nlet __marca = ${assignRhs('marca')}}}\nCarro.__propertiesDeclarations__.bind(null)()\n` +
      `Carro.__attr__ = ['modelo','marca','construtora']\n`
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
      `class Luz{\nstatic __propertiesDeclarations__() {if (this && this.ligado === undefined) {this.ligado = ${assignRhs('true').slice(0, -1)}}\n}constructor(){\nLuz.__propertiesDeclarations__.bind(this)()\n}` +
      `ligar(){\nthis.ligado = ${assignRhs('true')}}desligar(){\nthis.ligado = ${assignRhs('false')}} static esta_ligado(){ return this.ligado==true}}\nLuz.__propertiesDeclarations__.bind(null)()\n` +
      `Luz.__attr__ = ['ligado','ligar','desligar']\n`
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

test('generate interfaces gen', (): void => {
  const tryGenerateClassInstantiation = generatorTester(InterfaceDeclaration)

  tryGenerateClassInstantiation([
    ['definir interface IFoo foo fim', `let IFoo = { nome: 'IFoo', __props__: ['foo'] };\n`],
    ['definir interface IFoo foo bar fim', `IFoo = { nome: 'IFoo', __props__: ['foo','bar'] };\n`],
  ])
})
