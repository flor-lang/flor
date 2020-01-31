// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

process.env.PARSE_ENV = 'MAIN'

export const identifierTable = new Set()
export const blockTable = new Set()

const ast = Program.parse(
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
    `
)

logAst(ast, true)
console.log(identifierTable)
console.log(blockTable)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupBy = function (arr: any, criteria: any): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return arr.reduce(function (obj: any, item: any): any {
    const key = typeof criteria === 'function' ? criteria(item) : item[criteria]
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(key)) {
      obj[key] = []
    }
    obj[key].push(item)
    return obj
  }, {})
}

const group = groupBy(Array.from(blockTable), (item: any) => item.end.offset)
const scopes = []

for (const scope in group) {
  const blocks = group[scope]
  scopes.push(blocks.sort((b1: any, b2: any) => b1.start.offset > b2.start.offset)[0])
}

console.log('Scopes')
console.log(scopes)
