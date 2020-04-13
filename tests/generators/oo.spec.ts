import { ClassDeclaration } from '../../src/parsers/oo'
import { generatorTester } from '../utils'

test('generate class declaration', (): void => {
  const tryGenerateStatement = generatorTester(ClassDeclaration, true, 2)

  tryGenerateStatement([
    ['definir classe Pessoa fim', 'class Pessoa{\\n__propertiesDeclarations__() {}constructor(){\\nthis.__propertiesDeclarations__()\\n}}'],
    [
      `
      definir classe PessoaFisica
        heranca: Pessoa
        interfaces: Nomeavel Localizavel
      fim`  
    , 'class PessoaFisica extends Pessoa{\\n__propertiesDeclarations__() {}constructor(){\\nthis.__propertiesDeclarations__()\\n}}'
    ],
    [
      `
      definir classe Carro
        propriedades:
          privado modelo = "Esportivo"
          marca
          construtora
          estatico ano = 2020
        construtor: funcao (marca)
          __marca = marca
        fim
      fim
      `,
      'class Carro{\\n__propertiesDeclarations__() {this.modelo = \"Esportivo\"\\n' + 
      'this.marca = null\\nthis.construtora = null\\nthis.ano = 2020\\n}constructor(marca)' + 
      '{\\nthis.__propertiesDeclarations__()\\n__marca = marca\\n}}'
    ]
  ])
})
