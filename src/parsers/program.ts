import * as P from 'parsimmon'

import { Assignment } from './assignment'

export type ProgramParser = P.Parser<P.Node<'program', {}>>

export const Program: ProgramParser = Assignment
  .many()
  .node('program')
