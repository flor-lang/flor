import { AstNode } from '../traverse'
import Env from '../../enviroment/env'

export const numberCodeGen = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}

export const stringCodeGen = {
  enter (node: AstNode): void {
    Env.get().codeOutput += node.value
  }
}

export const booleanCodeGen = {
  enter (node: AstNode): void {
    Env.get().codeOutput += String(node.value)
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
