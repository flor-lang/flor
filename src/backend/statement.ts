import { returnCodeGen, labeledArgsCodeGen, whileCodeGen, doWhileCodeGen } from './generator/statement'

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

const doWhile = {
  enter (): void {
    doWhileCodeGen.enter()
  },
  between (): void {
    doWhileCodeGen.between()
  },
  exit (): void {
    doWhileCodeGen.exit()
  }
}

export default {
  returnStmt,
  labeledArgs,
  whileStmt,
  doWhile
}
