// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser, AstNode } from './backend/traverse'
import Env from './enviroment/env'
import SymbolTable from 'enviroment/symbol-table'
import { FlorErrorMessage } from './utils/errors'
import { FlorDeLib } from './lib/flordelib.flib'

/**
 * Parse input code generating abstract syntax tree
 * @param code Input flor code
 * @returns Object AstNode
 */
export const parseCode = (code: string): AstNode => Program.tryParse(code)

const loadStandardLib = (): void => {
  for (const key in FlorDeLib) {
    // eslint-disable-next-line no-prototype-builtins
    if (FlorDeLib.hasOwnProperty(key)) {
      Env.get().symbolTable.put(key, FlorDeLib[key])
    }
  }
}

const traverseAstFrom = (code: string, toLoadStandardLib = false): void => {
  if (toLoadStandardLib) {
    loadStandardLib()
  }
  traverser(parseCode(code), visitor)
}

/**
 * Traverse ast from flor input code and return your symbol table
 * @param code Input flor code
 * @param toLoadStandardLib Indicates whether to include the standard library in analysis process
 * @returns Object SymbolTable
 */
export const getSymbolTable = (code: string, toLoadStandardLib = false): SymbolTable => {
  traverseAstFrom(code, toLoadStandardLib)
  return Env.get().symbolTable
}

/**
 * Traverse ast from flor input code and return your JS output code
 * @param code Input flor code
 * @param toLoadStandardLib Indicates whether to include the standard library in analysis process
 * @returns JS generated code
 */
export const compile = (code: string, toLoadStandardLib = false): string => {
  traverseAstFrom(code, toLoadStandardLib)
  return Env.get().codeOutput
}

/**
 * Try traverse ast from flor input code and return your JS output code.
 * If an error is found, an erro message is returned
 * @param code Input flor code
 * @param toLoadStandardLib Indicates whether to include the standard library in analysis process
 * @returns Object { success: boolean; result: string }
 */
export const tryCompile = (code: string, toLoadStandardLib = false): { success: boolean; result: string } => {
  try {
    traverseAstFrom(code, toLoadStandardLib)
    return { success: true, result: Env.get().codeOutput }
  } catch (error) {
    return { success: false, result: FlorErrorMessage(error) }
  }
}
