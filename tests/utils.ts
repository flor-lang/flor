import { Parser } from 'parsimmon'
import { logAst } from '../src/utils/logger'
import { AstNode } from '../src/utils/traverse'
import { Program } from '../src/parsers/program'
// import { inspect } from 'util'

const parseStrings = (status: boolean) => (p: Parser<any>, log: boolean = false, index: number = undefined) => (a: string[]) => {
  a.map((s, i) => {
    const result = p.parse(s)
    if (log) {
      if (index !== undefined && i !== index) return
      console.log(`input is ${s}`)
      logAst(result, true)
      // console.log(inspect(result, false, null, true))
    }
    expect(
      result.status
    ).toBe(status)
  })
}

export const canParse = parseStrings(true)
export const cantParse = parseStrings(false)

export const generatorTester = (p: Parser<any>, cg: any, log: boolean = false, logIndex: number = undefined) => (inputs: [string, string][]) => {
  inputs.forEach((i, index) => {
    const ast = p.tryParse(i[0])
    const resultCode = cg(ast)
  
    if (log && index === logIndex) {
      const resultAst = p.parse(i[0])
      logAst(resultAst)
      // console.log(resultCode)
    }
  
    expect(resultCode).toBe(i[1])
  })
}

export const getAssignmentProgramAst = (): AstNode => {
  const ast = Program.tryParse(`i = 0`)

  return ast
}

export const getComplexProgramAst = (): AstNode => {

  const sourceCode = `
  definir interface Disputa
    time_a time_b
  fim

  definir classe Jogo
    interfaces: Disputa

    propriedades:
      time_a
      time_b
      privado numero_gols_a = 0
      privado numero_gols_b = 0
    
    construtor: funcao(time_a, time_b)
      __time_a = time_a
      __time_b = time_b
    fim

    metodos:
      marcar_gol = funcao(time)
        se time igual a __time_a entao
          __numero_gols_a = __numero_gols_a + 1
        senao
          __numero_gols_b = __numero_gols_b + 1
        fim
      fim

      texto = () := __time_a + ": " + __numero_gols_a + " | " + __time_b + ": " + __numero_gols_b
  fim

  jogo = novo Jogo(time_a: "Fortaleza", time_b: "Independiente")
  jogo.marcar_gol(time: "Fortaleza")
  escreva(texto: jogo)
  `
  const ast = Program.tryParse(sourceCode)

  return ast
} 
