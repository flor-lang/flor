// Playground code
// import { logAst } from './utils/logger'
import { Program } from './parsers/program'
// import { codeGenerator } from './generator/main'
import { visitor } from './visitor/visitor'
import { traverser } from './visitor/traverse'
import Env from './enviroment/env'
import { logAst } from './utils/logger'
// import { AstNode } from './utils/traverse'

// const astTeste = Program.parse(`i = 0`)
const ast = Program.tryParse(`
  i = 1+2
  j = 5+6
`)
traverser(ast, visitor)
console.log(Env.get().codeOutput)
console.log(Env.get().symbolTable)
