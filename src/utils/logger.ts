import { inspect } from 'util'
import { Result, Node } from 'parsimmon'

export const logAst = (ast: Result<Node<string, string|number|boolean|{}>>, simpleMode: boolean = true): void => {
  if (!simpleMode) return console.log(inspect(ast, false, null, true))

  // resto da funcao
}
