// Playground code
import { logAst } from './utils/logger'

import { Program } from './parsers/index'
const string = 'a // teste\n= 5'
console.log(string)
const ast = Program.parse(string)

// import { LineComment } from './parsers/comments'
// const string = ''
// console.log(string)
// const ast = LineComment.parse(string)

logAst(ast, true)
