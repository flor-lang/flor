import { AstNode } from './traverse'
import { numberCodeGen, stringCodeGen, booleanCodeGen, nullCodeGen, arrayCodeGen, keyValueCodeGen, dictionaryCodeGen } from './generator/literals'

const number = {
  enter (node: AstNode): void {
    numberCodeGen.enter(node)
  }
}

const string = {
  enter (node: AstNode): void {
    stringCodeGen.enter(node)
  }
}

const boolean = {
  enter (node: AstNode): void {
    booleanCodeGen.enter(node)
  }
}

const nil = {
  enter (): void {
    nullCodeGen.enter()
  }
}

const array = {
  enter (): void {
    arrayCodeGen.enter()
  },
  between (): void {
    arrayCodeGen.between()
  },
  exit (): void {
    arrayCodeGen.exit()
  }
}

const keyValue = {
  between (): void {
    keyValueCodeGen.between()
  }
}

const dictionary = {
  enter (): void {
    dictionaryCodeGen.enter()
  },
  between (): void {
    dictionaryCodeGen.between()
  },
  exit (): void {
    dictionaryCodeGen.exit()
  }
}

export default {
  number,
  string,
  boolean,
  nil,
  array,
  keyValue,
  dictionary
}
