import * as P from 'parsimmon'
import { Statement } from './statements'
import { ObjectParser } from './expressions'

export type BlockParser = P.Parser<P.Node<'block', {}>>
export type ProgramParser = P.Parser<P.Node<'program', {}>>

export const Block: BlockParser = P
  .seqObj(
    Statement.named('statement'),
    P.alt(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      P.lazy((): ObjectParser => Block),
      P.optWhitespace
    ).named('next-statement')
  )
  .node('block')

export const Program: ProgramParser = P
  .seq(Block)
  .node('program')
