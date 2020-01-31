// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

process.env.PARSE_ENV = 'MAIN'

export const identifierTable = new Set<string>()
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

// logAst(ast, true)
// console.log(identifierTable)
// console.log(blockTable)

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
  scopes.push(blocks.sort((b1: any, b2: any) => b1.start.offset < b2.start.offset)[0])
}

// console.log('Scopes')
// console.log(scopes.sort((s1, s2) => s1.start.offset - s2.start.offset))

const symbolTable: any = []
const identifiers = Array.from<string>(identifierTable)
  .map(id => JSON.parse(id))
  .sort((a, b) => a.start.offset - b.start.offset)

let i = 0
while (i < scopes.length) {
  const symbols: any[] = []
  const row = { scope: scopes[i], symbols }

  let j = -1
  while (j < identifiers.length - 1) {
    j = j + 1
    const objId = identifiers[j]
    if (scopes.length <= i + 1) {
      break
    }
    if (objId.start.offset < scopes[i + 1].start.offset) {
      identifiers.splice(j, 1)
      row.symbols.push(objId)
      j = -1
    }
  }

  symbolTable.push(row)
  i = i + 1
}

// scopes = scopes.sort((s1, s2) => s1.end.offset - s2.end.offset)
// symbolTable = symbolTable.sort((s1: any, s2: any) => s1.scope.end.offset < s2.scope.end.offset)

// i = 0
// while (i < symbolTable.length) {
//   let j = -1
//   while (j < identifiers.length - 1) {
//     j = j + 1
//     const objId = identifiers[j]
//     if (symbolTable.length <= i + 1) {
//       break
//     }
//     if (objId.start.offset > symbolTable[i + 1].scope.end.offset) {
//       identifiers.splice(j, 1)
//       symbolTable[i].symbols.push(objId)
//       j = j - 1
//     }
//   }
//   i = i + 1
// }

// symbolTable = symbolTable.sort((s1: any, s2: any) => s1.scope.start.offset > s2.scope.start.offset)

console.log('Symbol Table')
console.log(require('util').inspect(symbolTable.map((t: any) => {
  const { scope, symbols } = t
  return { scope: { name: scope.value.statement.value.name, start: scope.start, end: scope.end }, symbols }
}), false, null, true))
