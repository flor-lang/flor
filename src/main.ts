// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser, AstNode } from './backend/traverse'
import Env from './enviroment/env'
import SymbolTable from 'enviroment/symbol-table'
import { FlorErrorMessage } from './utils/errors'
// import { logAst } from './utils/logger'

export const parseCode = (code: string): AstNode => Program.tryParse(code)

const traverseAstFrom = (code: string): void => traverser(parseCode(code), visitor)

export const getSymbolTable = (code: string): SymbolTable => {
  traverseAstFrom(code)
  return Env.get().symbolTable
}

export const compile = (code: string): string => {
  traverseAstFrom(code)
  return Env.get().codeOutput
}

export const tryCompile = (code: string): { success: boolean; result: string } => {
  try {
    traverseAstFrom(code)
    return { success: true, result: Env.get().codeOutput }
  } catch (error) {
    return { success: false, result: FlorErrorMessage(error) }
  }
}
