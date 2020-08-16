import * as P from 'parsimmon'
import { Statement, StatementParser } from './statements'

export type BlockParser = P.Parser<P.Node<'block', {}>>
export type ProgramParser = P.Parser<P.Node<'program', {}>>

/** `
 * Parse Block
 *
 * block -> statement block | ∊
 */
export const Block: BlockParser = P
  .lazy((): StatementParser => Statement)
  .many()
  .node('block')

/**
 * Parse Program
 * program -> block
 */
export const Program: ProgramParser = Block
  .node('program')
