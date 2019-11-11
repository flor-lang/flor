import * as P from 'parsimmon'

import { Assignment } from './assignment'
import { LineComment } from './comments'

export type ProgramParser = P.Parser<P.Node<'program', {}>>

export const Program: ProgramParser = Assignment
  .trim(
    P.alt(
      LineComment,
      P.optWhitespace
    )
  )
  .many()
  .node('program')
