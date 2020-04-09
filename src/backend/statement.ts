import {
  returnCodeGen,
  labeledArgsCodeGen,
  whileCodeGen,
  doWhileCodeGen,
  forEachCodeGen
} from './generator/statement'
import { AstNode } from './traverse'

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

const forEach = {
  enter (): void {
    forEachCodeGen.enter()
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    forEachCodeGen.between(node, parent, index)
  }
}

export default {
  returnStmt,
  labeledArgs,
  whileStmt,
  doWhile,
  forEach
}
