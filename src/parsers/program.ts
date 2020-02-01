import * as P from 'parsimmon'
import { Statement, StatementParser } from './statements'
import { ObjectParser } from './expressions'
import { blockTable } from '../main'

export type BlockParser = P.Parser<P.Node<'block', {}>>
export type ProgramParser = P.Parser<P.Node<'program', {}>>

/**
 * Parse Block
 *
 * block -> statement block | ∊
 */
export const Block: BlockParser = P
  .seqObj(
    P.optWhitespace,
    P.lazy((): StatementParser => Statement).named('statement'),
    P.optWhitespace,
    P.alt(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.lazy((): ObjectParser => Block),
      P.optWhitespace
    ).named('next-statement')
  )
  .node('block')
  .map((node): P.Node<'block', {}> => {
    if (process.env.PARSE_ENV === 'MAIN') {
      blockTable.add({
        name: (node.value as { statement: { value: { name: string} } }).statement.value.name,
        start: node.start,
        end: node.end
      })
    }
    return node
  })

/**
 * Parse Program
 * program -> block
 */
export const Program: ProgramParser = Block
  .node('program')
