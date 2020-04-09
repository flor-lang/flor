import Env from '../../enviroment/env'
// import { AstNode } from '../traverse'

export const returnCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'return '
  }
}
