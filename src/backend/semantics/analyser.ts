/* eslint-disable @typescript-eslint/no-unused-vars */
import Env from '../../enviroment/env'
import { AstNode } from '../traverse'

type AnalyserFunction = (node: AstNode) => void
const Analyser = {
  create (analyserfn: AnalyserFunction): AnalyserFunction {
    return (node: AstNode): void => {
      if (Env.get().context !== 'test') {
        analyserfn(node)
      }
    }
  },
  throwError (message: string, node: AstNode): void {
    throw new Error(`\n${message}\n` +
    `  Linha: ${node.start.line}\n` +
    `  Coluna: ${node.start.column}`
    )
  }
}

export default Analyser
