import {
  returnCodeGen,
  labeledArgsCodeGen,
  whileCodeGen,
  doWhileCodeGen,
  forEachCodeGen,
  ifThenElseCodeGen,
  elifCodeGen
} from './generator/statement'
import { AstNode } from './traverse'
import { evaluateFunctionCallUse } from './semantics/definitions'
import { evaluateFunctionCallAsClassInstantiation } from './semantics/oo'

const functionCall = {
  enter (node: AstNode, parent: AstNode): void {
    if (parent.name === 'class-instantiation') {
      evaluateFunctionCallAsClassInstantiation(node)
    }
    if (parent.name === 'statement') {
      evaluateFunctionCallUse(node)
    }
  }
}

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

const ifThenElse = {
  enter (): void {
    ifThenElseCodeGen.enter()
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    ifThenElseCodeGen.between(node, parent, index)
  }
}

const elif = {
  enter (): void {
    elifCodeGen.enter()
  },
  between (node: AstNode, parent: AstNode, index: number): void {
    elifCodeGen.between(node, parent, index)
  }
}

export default {
  functionCall,
  returnStmt,
  labeledArgs,
  whileStmt,
  doWhile,
  forEach,
  ifThenElse,
  elif
}
