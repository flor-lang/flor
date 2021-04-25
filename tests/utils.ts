import { spawn } from "child_process"
import { createInterface } from "readline"
import { Parser } from 'parsimmon'
import { logAst } from '../src/utils/logger'
import { AstNode } from '../src/backend/traverse'
import { Program } from '../src/parsers/program'
import { traverser } from '../src/backend/traverse'
import { visitor } from '../src/backend/visitor'
import Env from '../src/enviroment/env'
import { unlink } from "fs"

export const assignRhs = (code: string): string => `__pf__.expr(${code});`

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

export const generatorTester = (p: Parser<any>, log: boolean = false, logIndex: number = undefined) => (inputs: [string, string][], polyfill = '') => {
  inputs.forEach((i, index) => {
    Env.get().clean('test')

    const ast = p.tryParse(i[0])
    traverser(ast, visitor)

    const resultCode = polyfill
      ? Env.get().getCodeOutputPolyfilled()
      : Env.get().codeOutput

    if (log && index === logIndex) {
      const resultAst = p.parse(i[0])
      logAst(resultAst, true)
    }

    expect(resultCode).toBe(`${polyfill ? `const __pf__ = {\n${polyfill}};\n` : ''}${i[1]}`)
  })
}

export const semanticTester = (toThrowError: boolean, errorPattern?: RegExp) => (inputs: string[]): void => {
  inputs.forEach(input => {
    Env.get().clean()
    const ast = Program.tryParse(input)
    const evaluate = () => traverser(ast, visitor)
    if (toThrowError) {
      expect(evaluate).toThrowError(errorPattern)
    } else {
      expect(evaluate).not.toThrowError()
    }
  })
}

export const getAssignmentProgramAst = (): AstNode => {
  const ast = Program.tryParse(`i = 1-1`)

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
      numero_gols_a = 0
      numero_gols_b = 0
    
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

type InputFn = (input: string) => void
type RunOutputOptions = {
  debug?: boolean,
  stdout?: InputFn,
  stderr?: InputFn,
  compile?: InputFn,
  error?: (error: Error) => void
}
export const runFlorFile = (file: string, output: RunOutputOptions) => {
  const filePath = `./tests/runtime/files/${file}`
  const florExec = spawn('./dist/cli/index.js', [filePath], {
    env: {
      ...process.env,
      FLOR_RUNTIME_ENV: 'test'
    }
  })
  if (output.stdout) {
    createInterface({ input: florExec.stdout }).on('line', output.stdout)
  }
  if (output.stderr) {
    createInterface({ input: florExec.stderr }).on('line', output.stderr)
  }
  if (output.error) {
    florExec.on('error', output.error)
  }
  if (output.debug) {
    createInterface({ input: florExec.stdout }).on('line', console.log)
    createInterface({ input: florExec.stderr }).on('line', console.error)
    florExec.on('error', (error: Error): void => console.error(error.message))
  }
  florExec.on('exit', () => {
    if (output.compile) {
      output.compile(filePath.replace('/tests/runtime', '').replace('.flor', '.js'))
    }
    unlink(filePath.replace('.flor', '.js'), err => {
      if (err) {
        console.log(err.message)
      }
    })
  })
}
