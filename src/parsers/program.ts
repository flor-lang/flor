import * as P from 'parsimmon'
import { Statement, StatementParser } from './statements'
import { ObjectParser } from './expressions'

export type BlockParser = P.Parser<P.Node<'block', {}>>
export type ProgramParser = P.Parser<P.Node<'program', {}>>

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

export const Program: ProgramParser = Block
  .node('program')
