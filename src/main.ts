// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser } from './backend/traverse'
import Env from './enviroment/env'
import { logAst } from './utils/logger'

const ast = Program.tryParse('f()')

traverser(ast, visitor)
logAst(ast, true)
// console.log(Env.get().symbolTable)
console.log(Env.get().codeOutput)
