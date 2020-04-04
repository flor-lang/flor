import { Visitor } from './traverse'

import assignment from './assignment'
import literals from './literals'
import operators from './operators'
import program from './program'

export const visitor: Visitor = {
  ...program,
  ...assignment,
  ...literals,
  ...operators
}
