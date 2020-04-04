// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser } from './backend/traverse'
import Env from './enviroment/env'
import { logAst } from './utils/logger'

const ast = Program.tryParse(`
  i = 1+2
  j = i-1
  i = j
`)

traverser(ast, visitor)
logAst(ast, true)
console.log(Env.get().symbolTable)
console.log(Env.get().codeOutput)
