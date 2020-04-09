import { Visitor } from './traverse'

import assignment from './assignment'
import literals from './literals'
import operators from './operators'
import program from './program'
import expressions from './expressions'
import statement from './statement'

export const visitor: Visitor = {
  ...program,
  ...assignment,
  ...expressions,
  ...literals,
  ...operators,
  ...statement
}
