import { Visitor } from './traverse'

import assignment from './assignment'
import literals from './literals'
import operators from './operators'

export const visitor: Visitor = {
  ...assignment,
  ...literals,
  ...operators
}
