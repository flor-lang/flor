import { Assignment, Loc, Identifier } from '../../src/parsers/assignment'
import { canParse, cantParse } from '../utils'

test('parse loc', (): void => {
  const canParseLoc = canParse(Loc)
  const cantParseLoc = cantParse(Loc)

  canParseLoc([
    'array[0]', 'arr[1][0]', 'arr[0 / 0]', 'arr[1 + 1]', 'arr["troll"]', 'arr[falso]',
    'pessoa.nome', 'pessoa.endereco.logradouro', 'peixe.nadar()', 'pessoa.endereco.mudar()', 'pets.gato.limpar()',
    'cardume[1].nadar()', 'contato.lista_de_numeros[0]'
  ])
  cantParseLoc(['array[]', '[]', '[][]', '[0]id'])
})

test('parse assignment operation', (): void => {
  const canParseAssignment = canParse(Assignment)
  const cantParseAssignment = cantParse(Assignment)

  canParseAssignment([
    'foo = se 5 > 3 entao 1 senao 2',
    'resultado = duplicar(x: 5) - 10',
    'duplicar = (valor) := valor * 2',
    'x = 20',
    'b=verdadeiro',
    '_c = "string"',
    'op=nulo',
    'foo.bar = "teste"',
    'arr[0] =falso',
    'x[0][0]= 0',
    'identifier = identifier',
    'foo = ~((bar * 5) >= arr[index])',
    'funcao_dois = "teste"',
    `somar = funcao(x, y)
       retornar x + y
     fim`,
    'somar = (x) := x + y',
    'resultado = somar (x: 0, y: 1)',
    'indice_2 = ordenar (lista: numeros)[2]',
    'entrada = [102, 104, 140, 95, 99]',
    'mensagens = ["oi", "iai", "tudo bem", "tudo show"]',
    'futuro = []',
    'contato[1].lista_de_numeros[0] = "(77)77777-7777"',
    'auxiliar = contatos.filtrar(numero: "(77)77777-7777")[0]'
  ])

  cantParseAssignment([
    '_ = "something"',
    '_ = _',
    'nulo = nulo',
    '"string" = nulo',
    '[0] = 5',
    'arr[] = "something"',
    'funcao = nulo'
  ])
})

test('parse identifier', (): void => {
  const canParseIdentifier = canParse(Identifier)
  const cantParseIdentifier = cantParse(Identifier)

  canParseIdentifier([
    'x','_variavel','x1','snake_case', '_2D',
    '#marca', "#f", '__main', '_a_b_c', 'super'
  ])
  cantParseIdentifier([
    '1', '55', '_', '__', '#__', '#', '__reserved__', 'id_', '2D', '#1', '##',
    '&teste', 'test§', '"meu nome"', 'teste teste', 'espaço', 'verdadeiro', 'falso','nulo'
  ])
})
