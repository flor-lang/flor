// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser, AstNode } from './backend/traverse'
import Env from './enviroment/env'
import SymbolTable from './enviroment/symbol-table'
import { FlorErrorMessage } from './utils/errors'
import { StandardLib } from './lib/standard.flib'
import comments from './utils/comments'

export { logAst, logSymbolTable } from './utils/logger'
export { StandardLibJSImpl } from './lib/jsimpl/standard'
export { SymbolTable, AstNode }

/**
 * Parse input code generating abstract syntax tree
 * @param code Input flor code
 * @returns Object AstNode
 */
export const parseCode = (code: string): AstNode => Program.tryParse(code)

const loadStandardLib = (callbackfn: (identifier: string, node: AstNode) => void): void => {
  for (const key in StandardLib) {
    // eslint-disable-next-line no-prototype-builtins
    if (StandardLib.hasOwnProperty(key)) {
      callbackfn(key, StandardLib[key])
    }
  }
}

const traverseAstFrom = (code: string, toLoadStandardLib = false): void => {
  if (toLoadStandardLib) {
    loadStandardLib((identifier, node): void => Env.get().symbolTable.put(identifier, node))
  }
  const executableCode = comments.remove(code)
  traverser(parseCode(executableCode), visitor)
}

/**
 * Traverse ast from flor input code and return your symbol table
 * @param code Input flor code
 * @param toLoadStandardLib Indicates whether to include the standard library in analysis process
 * @returns Object SymbolTable
 */
export const getSymbolTable = (code: string, toLoadStandardLib = false): SymbolTable => {
  traverseAstFrom(code, toLoadStandardLib)
  const table = Env.get().symbolTable
  loadStandardLib((identifier): AstNode => table.rm(identifier))
  Env.get().clean()
  return table
}

/**
 * Traverse ast from flor input code and return your JS output code
 * @param code Input flor code
 * @param toLoadStandardLib Indicates whether to include the standard library in analysis process
 * @returns JS generated code
 */
export const compile = (code: string, toLoadStandardLib = false): string => {
  traverseAstFrom(code, toLoadStandardLib)
  const output = Env.get().codeOutput
  Env.get().clean()
  return output
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
    const result = Env.get().codeOutput
    Env.get().clean()
    return { success: true, result }
  } catch (error) {
    const result = FlorErrorMessage(error)
    Env.get().clean()
    return { success: false, result }
  }
}
