// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  definir classe Carro
    propriedades:
      privado modelo
      marca
      construtora
      estatico ano = 2020

    construtor: funcao (modelo)
      __modelo = modelo
    fim
  fim
`)
logAst(ast, true)
