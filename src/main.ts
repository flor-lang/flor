/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'
import { any } from 'parsimmon'
import { asTree } from 'treeify'

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
let scopes = []

for (const blockStmt in group) {
  const blocks = group[blockStmt]
  scopes.push(blocks.sort((b1: any, b2: any) => b1.start.offset > b2.start.offset)[0])
}

scopes = scopes.sort((s1, s2) => s1.start.offset - s2.start.offset)

let scopeSymbols: any = []
const identifiers = Array.from<string>(identifierTable)
  .map(id => JSON.parse(id))
  .sort((a, b) => a.start.offset - b.start.offset)

let i = 0
while (i < scopes.length) {
  const symbols: any[] = []
  const row = { blockStmt: scopes[i], symbols }

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

  scopeSymbols.push(row)
  i = i + 1
}

scopes = scopes.sort((s1, s2) => s1.end.offset - s2.end.offset)
scopeSymbols = scopeSymbols.sort((s1: any, s2: any) => s1.blockStmt.end.offset < s2.blockStmt.end.offset)

i = 0
while (i < scopeSymbols.length) {
  let j = -1
  while (j < identifiers.length - 1) {
    j = j + 1
    const objId = identifiers[j]
    if (scopeSymbols.length <= i + 1) {
      break
    }
    if (objId.start.offset > scopeSymbols[i + 1].blockStmt.end.offset) {
      identifiers.splice(j, 1)
      scopeSymbols[i].symbols.push(objId)
      j = j - 1
    }
  }
  i = i + 1
}

scopeSymbols = scopeSymbols.sort((s1: any, s2: any) => s1.blockStmt.start.offset > s2.blockStmt.start.offset)

// console.log('Scope Symbols')
// console.log(require('util').inspect(scopeSymbols, false, null, true))

const symbolTable: any = []

/* Children Methods beta versions */
// scopeSymbols = scopeSymbols.map((s: any) => ({ children: [], ...s }))
// const [root] = scopeSymbols.splice(0, 1)
// symbolTable.push(root)

// scopeSymbols.forEach((scopeSymbol: any) => {
//   let insides = symbolTable.filter((row: any) => (
//     scopeSymbol.blockStmt.start.offset > row.blockStmt.start.offset &&
//     scopeSymbol.blockStmt.end.offset < row.blockStmt.end.offset
//   ))
//   while (insides.length !== 0) {
//     const scope = insides[0]
//     insides = scope.children.filter((row: any) => (
//       scopeSymbol.blockStmt.start.offset > row.blockStmt.start.offset &&
//       scopeSymbol.blockStmt.end.offset < row.blockStmt.end.offset
//     ))
//     if (insides.length === 0) {
//       scope.children.push(scopeSymbol)
//     }
//   }
// })

/* Children Methods beta versions */
scopeSymbols = scopeSymbols.map((s: any) => ({ parent: null, ...s }))
i = 0
while (i < scopeSymbols.length) {
  // add to table in less cross point and remove from scope
  const insides = symbolTable.filter((row: any) => (
    scopeSymbols[i].blockStmt.start.offset > row.blockStmt.start.offset &&
    scopeSymbols[i].blockStmt.end.offset < row.blockStmt.end.offset
  ))
  const parentScopeSymbol = insides.sort((i1: any, i2: any) => {
    const x1 = scopeSymbols[i].blockStmt.start.offset - i1.blockStmt.start.offset
    const y1 = scopeSymbols[i].blockStmt.end.offset - i1.blockStmt.end.offset
    const d1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2))
    const x2 = scopeSymbols[i].blockStmt.start.offset - i2.blockStmt.start.offset
    const y2 = scopeSymbols[i].blockStmt.end.offset - i2.blockStmt.end.offset
    const d2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2))
    return d1 > d2
  })
  if (parentScopeSymbol.length !== 0) {
    scopeSymbols[i].parent = parentScopeSymbol[0].blockStmt
  }
  symbolTable.push(scopeSymbols[i])
  i = i + 1
}

console.log('Symbol Table')
// console.log(require('util').inspect(symbolTable, false, null, true))
console.log(asTree(symbolTable, true, false))
