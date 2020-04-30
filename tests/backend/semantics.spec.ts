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
    `,
    `definir classe Foo fim
    o = novo Foo()
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

  mustBeAllowed([
    `definir classe Teste
        propriedades: valor = 0 duplicado
        construtor: funcao ()
          #duplicado = #valor * 2
        fim
    fim`
  ])

  mustThrows([
    '#propriedade = 0', '#metodo = () := 0',
    `definir classe Teste
        propriedades: valor = 0
    fim
    #valor = 1`
  ])

})

test('test class instantiation', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true,
    /.*(As cláusulas \[novo, nova\] só podem ser usadas para instanciar classes|Classe '.+' não foi definida)/)

  mustBeAllowed([
    `definir classe Foo fim
    o = novo Foo()
    `
  ])

  mustThrows([
    'teste = nova Pessoa(nome: "Teste")',
    `definir classe Foo fim
    o = novo Bar()
    `,
    // `Foo = () := nulo
    // foo = novo Foo()`
  ])

})

test('teste super call at subclasses', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true,
    /(.*Em construtores de subclasses, 'super\(\.\.\.\)' deve ser chamado no início da função)|(.*Função 'super' não foi definida)/)

  mustBeAllowed([
    `definir classe Foo
      propriedades: variavel_teste
      construtor: funcao ()
        #variavel_teste = 0
      fim
    fim
    
    definir classe Bar
      heranca: Foo
      propriedades: random
      construtor: funcao ()
        super()
        #random = 0
      fim
    fim`,

    `definir classe Foo fim
    definir classe Bar
      heranca: Foo
    fim`
  ])

  mustThrows([
    `definir classe Foo
      propriedades: variavel_teste
      construtor: funcao ()
        #variavel_teste = 0
      fim
    fim
    
    definir classe Bar
      heranca: Foo
      propriedades: random
      construtor: funcao ()
        #random = 0
        super()
      fim
    fim`,
    `definir classe Foo
      construtor: funcao ()
        super()
      fim
    fim`
  ])

})

test('teste super call at subclasses', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true, /.*Classe '.+' não foi definida/)

  mustBeAllowed([
    `definir classe Foo fim
    definir classe Bar
      heranca: Foo
    fim`
  ])

  mustThrows([
    `definir classe Bar heranca: Foo fim`
  ])

})

test('test static members', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true,
    /(.*Váriavel '.+' não foi definida)|(.*Membros \[#, super\] não podem ser usados dentro de um método estático)/)

  mustBeAllowed([
    `definir classe Bar
      propriedades:
        estatico prop = 0
      metodos:
        estatico foo = (x) := x
    fim`
  ])

  mustThrows([
    `definir classe Bar
      propriedades:
        estatico prop = 0
      metodos:
        estatico foo = (x) := x * #prop
    fim`,
    `definir classe Bar
      propriedades:
        estatico prop = 0
        teste = 0
      metodos:
        estatico foo = (x) := x * #teste
    fim`,
    `definir classe Bar
      propriedades:
        estatico prop = 0
        teste = 0
      metodos:
        estatico foo = (x) := x * super.teste
    fim`
  ])

})

test('test class declarations', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true, /.*Uma classe só pode ser definida globalmente/)

  mustBeAllowed([
    `definir classe Bar
      propriedades:
        estatico prop = 0
    fim`
  ])

  mustThrows([
    `definir classe PessoaJuridica
      propriedades:
        cnpj
      construtor: funcao (cnpj)
        #cnpj = cnpj
        definir classe Foo
          propriedades: bar = 0
        fim
      fim
    fim`
  ])

})

