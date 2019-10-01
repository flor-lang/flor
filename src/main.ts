// Sample code
import { inspect } from 'util'
import { Add } from './parsers/expression'

// const ast = Add.parse('-1 / -(4 + 2)')
const ast = Add.parse('2-*5')
console.log(inspect(ast, false, null, true))

export const sum = (...a: number[]): number => a.reduce((acc, val): number => acc + val, 0)
