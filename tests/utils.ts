import { Parser } from 'parsimmon'
import { logAst } from '../src/utils/logger'
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
