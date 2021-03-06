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
    fim`,
    `expoente = 2
    exp = 5^expoente
    `
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
    teste = #valor`,
    'exp = 5^expoente'
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
  const mustThrows = semanticTester(true, 
    /(.*Operadores \[#, super\] não podem ser usados fora da definição de uma classe|.*Váriavel '.*' não foi definida)/)

  mustBeAllowed([
    `definir classe Teste
        propriedades: valor = 0 duplicado
        construtor: funcao ()
          #duplicado = #valor * 2
        fim
    fim`,
    `definir classe Pai
      propriedades: hey
    fim
    definir classe Teste
        heranca: Pai
        propriedades: valor = 0 duplicado
        construtor: funcao ()
            super()
            #duplicado = #hey
        fim
    fim`
  ])

  mustThrows([
    '#propriedade = 0', '#metodo = () := 0',
    `definir classe Teste
        propriedades: valor = 0
    fim
    #valor = 1`,
    `definir classe Pai
        propriedades: hey
    fim
    definir classe Teste
        heranca: Pai
        propriedades: valor = 0 duplicado
        construtor: funcao ()
            super()
            #duplicado = #show
        fim
    fim`
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

test('test super call at subclasses', () => {
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

test('test parent class definition', () => {
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

test('test global declarations', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true, /.*Uma .* só pode ser definida globalmente/)

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
    fim`,
    `foo = funcao ()
      definir interface Foo foo fim
    fim`
  ])

})

test('test interface use', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true, /.*Interface '.+' não foi definida/)

  mustBeAllowed([
    `definir interface Autenticavel
      usuario senha
    fim
    definir classe Cliente
      interfaces: Autenticavel
      propriedades:
        nome
        data_de_nascimento
        usuario
        senha
    fim`,
    `definir interface Foo foo fim
    definir interface Bar bar fim
    definir classe Teste
      interfaces: Foo Bar
      propriedades: foo bar
    fim`
  ])

  mustThrows([
    `definir classe Teste
      interfaces: Hey
    fim`,
    `definir interface Foo foo fim
    definir interface Bar bar fim
    definir classe Teste
      interfaces: Foo Outra Fim
      propriedades: foo bar
    fim`
  ])

})

test('test interfaces implementations', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true, /.+não está em conforme com a interface.+'/)

  mustBeAllowed([
    `
    definir interface Autenticavel
      usuario senha login
    fim
    definir classe Cliente
      interfaces: Autenticavel
      propriedades:
        nome
        data_de_nascimento
        usuario
        senha
      metodos:
        login = (senha) := #senha igual a senha
    fim
    `,
    `definir interface Foo foo fim
    definir interface Bar bar fim
    definir classe Teste
      interfaces: Foo Bar
      propriedades: foo bar
    fim`
  ])

  mustThrows([
    `definir interface Foo foo fim
    definir classe Teste
      interfaces: Foo
      propriedades: hey
    fim`,
    `definir interface Foo foo fim
    definir interface Bar bar fim
    definir classe Teste
      interfaces: Foo Bar
      propriedades: foo
    fim`,
  ])
})

test('test private properties access', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true,
    /(.*Variáveis privadas \(iniciadas com '_'\) não podem ser acessadas fora de suas respectivas classes|.*não foi definida)/)

  mustBeAllowed([
    '_foo = 0',
    'foo = [0] foo[0] = 1',
    `definir classe Foo
      propriedades: _sou_privado
      metodos: bar = () := #_sou_privado + 1
    fim`
  ])

  mustThrows([
    `foo = nulo
    foo._away = 0`,
    `foo = nulo
    bar = foo._away`,
    `foo = nulo
    bar = foo._away()`,
    'foo = [nulo] foo[0]._prop = 1',
    'foo = [nulo] foo[0] = foo[0]._prop',
    `definir classe Bar
      propriedades: _privado_do_pai
    fim
    definir classe Foo heranca: Bar
      metodos: bar = () := #_privado_do_pai + 1
    fim`
  ])

})


test('test recursion, name and args symbols inside block scope', () => {
  semanticTester(false)([
    `fibonacci = funcao (posicao)
        se posicao < 2 entao
            retornar posicao
        senao
            retornar fibonacci(posicao - 1) + fibonacci(posicao - 2)
        fim
    fim`,
    `recursao1 = funcao (n)
      foo = funcao ()
        retornar foo() + recursao1(0)
      fim
      foo()
      retornar recursao1(n-1)
    fim`,
    'fibo = (n) := se n < 2 entao n senao fibo(n - 1) + fibo(n - 2)'
  ])
})

test('test breaks and continues use', () => {
  const mustBeAllowed = semanticTester(false)
  const mustThrows = semanticTester(true,
    /(.*Os alteradores \[pular_iteracao, interromper_laco\] só podem ser utilizados dentro de laços\.)/)

  mustBeAllowed([
    `enquanto verdadeiro faca
      interromper_laco
      pular_iteracao
    fim`,
    `faca
      interromper_laco
      pular_iteracao
    enquanto verdadeiro
    fim`,
    `frota = [0,1,2]
    para cada elemento de frota faca
      interromper_laco
      pular_iteracao
    fim`,
    `frota = [0,1,2]
    enquanto verdadeiro faca
      foo = funcao ()
        para cada i de frota faca
          pular_iteracao
        fim
      fim
    fim`,
    `enquanto verdadeiro faca
      se verdadeiro entao
        pular_iteracao
      fim
    fim`,
    `enquanto verdadeiro faca
      foo = funcao ()
        retornar "froids"
      fim
      pular_iteracao
    fim`
  ])

  mustThrows([
    'pular_iteracao',
    `foo = funcao ()
      pular_iteracao
    fim`,
    `enquanto verdadeiro faca
      foo = funcao ()
        pular_iteracao
      fim
    fim`,
    `definir classe Foo
      construtor: funcao ()
        pular_iteracao
      fim
    fim`
  ])

})
