import { Visitor } from './traverse'

import assignment from './visitors/assignment'
import literals from './visitors/literals'
import operators from './visitors/operators'
import program from './visitors/program'
import expressions from './visitors/expressions'
import statement from './visitors/statement'
import oo from './visitors/oo'

export const visitor: Visitor = {
  ...program,
  ...assignment,
  ...expressions,
  ...literals,
  ...operators,
  ...statement,
  ...oo
}
