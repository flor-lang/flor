import { Parser } from 'parsimmon'

const parseStrings = (status: boolean) => (p: Parser<any>, log: boolean = false, index: number = undefined) => (a: string[]) => {
  a.map((s, i) => {
    const result = p.parse(s)
    if (log) {
      if (index !== undefined && i !== index) return
      console.log(`input is ${s}`)
      console.log(JSON.stringify(result, null, 2))
    }
    expect(
      result.status
    ).toBe(status)
  })
}

export const canParse = parseStrings(true)
export const cantParse = parseStrings(false)
