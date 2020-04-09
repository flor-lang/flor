import { returnCodeGen, labeledArgsCodeGen, whileCodeGen } from './generator/statement'

const returnStmt = {
  enter (): void {
    returnCodeGen.enter()
  }
}

const labeledArgs = {
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

const whileStmt = {
  enter (): void {
    whileCodeGen.enter()
  },
  between (): void {
    whileCodeGen.between()
  }
}

export default {
  returnStmt,
  labeledArgs,
  whileStmt
}
