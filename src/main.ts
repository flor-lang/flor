// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

// const ast = Program.tryParse(`i = 0`)
const ast = Program.parse(`i = 0`)

// console.log(JSON.stringify(ast, null, 4))
logAst(ast, true)
