import { AstNode } from '../traverse'
import Env from '../../enviroment/env'

export const numberCodeGen = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}

export const stringCodeGen = {
  enter (node: AstNode, parent: AstNode): void {
    let value = node.value as string
    if (parent.name === 'import-expression') {
      value = value.startsWith('$') ? value.slice(1) : `./${value}`
    }
    Env.get().codeOutput += `"${value}"`
  }
}

export const booleanCodeGen = {
  enter (node: AstNode): void {
    if (node.value === true) {
      Env.get().codeOutput += 'true'
    } else if (node.value === false) {
      Env.get().codeOutput += 'false'
    }
  }
}

export const nullCodeGen = {
  enter (): void {
    Env.get().codeOutput += 'null'
  }
}

export const arrayCodeGen = {
  enter (): void {
    Env.get().codeOutput += '['
  },
  between (): void {
    Env.get().codeOutput += ','
  },
  exit (): void {
    Env.get().codeOutput += ']'
  }
}

export const keyValueCodeGen = {
  between (): void {
    Env.get().codeOutput += ':'
  }
}

export const dictionaryCodeGen = {
  enter (): void {
    Env.get().codeOutput += '{'
  },
  between (): void {
    Env.get().codeOutput += ','
  },
  exit (): void {
    Env.get().codeOutput += '}'
  }
}
