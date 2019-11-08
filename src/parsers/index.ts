import * as P from 'parsimmon'

import { Assignment } from './assignment'
import { LineComment } from './comments'

export type ProgramParser = P.Parser<P.Node<'program', {}>>

export const Program: ProgramParser =
  Assignment.many()
  .trim(LineComment)
  .node('program')
