import { returnCodeGen } from './generator/statement'

const retornar = {
  enter (): void {
    returnCodeGen.enter()
  }
}

export default {
  retornar
}
