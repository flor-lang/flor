import { canParse, cantParse } from './utils'
import { InterfaceDeclaration, ClassDeclaration } from '../src/parsers/oo'

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
