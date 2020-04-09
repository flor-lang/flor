import { returnCodeGen, labeledArgsCodeGen } from './generator/statement'

const retornar = {
  enter (): void {
    returnCodeGen.enter()
  }
}

export const labeledArgs = {
  enter (): void {
    labeledArgsCodeGen.enter()
  },
  between (): void {
    labeledArgsCodeGen.between()
  },
  exit (): void {
    labeledArgsCodeGen.exit()
  }
}

export default {
  retornar,
  labeledArgs
}
