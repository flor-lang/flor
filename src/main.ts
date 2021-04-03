// Playground code
import { Program } from './parsers/program'
import { visitor } from './backend/visitor'
import { traverser, AstNode } from './backend/traverse'
import Env from './enviroment/env'
import SymbolTable from './enviroment/symbol-table'
import { FlorCompilationErrorMessage } from './utils/errors'
import { StandardLib, EmptyAstNode } from './lib/standard.flib'
import comments from './utils/comments'

export { logAst, logSymbolTable } from './utils/logger'
export { StandardLibJSImpl } from './lib/impl/standard'
export { SymbolTable, AstNode }

/**
 * Parse input code generating abstract syntax tree
 * @param code Input flor code
 * @returns Object AstNode
 */
export const parseCode = (code: string): AstNode => Program.tryParse(code)

const loadAbstractLib = (identifiers: string[] = []): void => {
  identifiers.forEach((identifier: string): void => {
    Env.get().symbolTable.put(identifier, EmptyAstNode)
  })
}

const loadStandardLib = (callbackfn: (identifier: string, node: AstNode) => void): void => {
  for (const key in StandardLib) {
    // eslint-disable-next-line no-prototype-builtins
    if (StandardLib.hasOwnProperty(key)) {
      callbackfn(key, StandardLib[key])
    }
  }
}

const traverseAstFrom = (code: string, toLoadStandardLib = false, abstractLib: string[] = []): void => {
  Env.get().clean('prod')
  if (toLoadStandardLib) {
    loadStandardLib((identifier, node): void => Env.get().symbolTable.put(identifier, node))
  }
  loadAbstractLib(abstractLib)
  const executableCode = comments.remove(code)
  traverser(parseCode(executableCode), visitor)
}

/**
 * Traverse ast from flor input code and return your symbol table
 * @param code Input flor code
 * @param toLoadStandardLib Indicates whether to include the standard library in analysis process
 * @returns Object SymbolTable
 */
export const getSymbolTable = (code: string, toLoadStandardLib = false, abstractLib: string[] = []): SymbolTable => {
  traverseAstFrom(code, toLoadStandardLib, abstractLib)
  const table = Env.get().symbolTable
  loadStandardLib((identifier): AstNode => table.rm(identifier))
  Env.get().clean('prod')
  return table
}

/**
 * Traverse ast from flor input code and return your JS output code
 * @param code Input flor code
 * @param toLoadStandardLib Indicates whether to include the standard library in analysis process
 * @returns JS generated code
 */
export const compile = (code: string, toLoadStandardLib = false, abstractLib: string[] = []): string => {
  traverseAstFrom(code, toLoadStandardLib, abstractLib)
  const output = Env.get().getCodeOutputPolyfilled()
  Env.get().clean('prod')
  return output
}

/**
 * Try traverse ast from flor input code and return your JS output code.
 * If an error is found, an erro message is returned
 * @param code Input flor code
 * @param toLoadStandardLib Indicates whether to include the standard library in analysis process
 * @returns Object { success: boolean; result: string }
 */
export const tryCompile = (code: string, toLoadStandardLib = false, abstractLib: string[] = []): { success: boolean; result: string } => {
  try {
    const result = compile(code, toLoadStandardLib, abstractLib)
    return { success: true, result }
  } catch (error) {
    const result = FlorCompilationErrorMessage(error)
    Env.get().clean('prod')
    return { success: false, result }
  }
}
