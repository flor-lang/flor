// Playground code
import { logAst } from './utils/logger'
import { Program } from './parsers/program'

const ast = Program.parse(`
  definir classe Carro
      heranca: Veiculo
      interfaces: Locomotivel Personalizavel

      propriedades:
          privado modelo
          marca
          construtora
          estatico ano = 2020

      construtor: funcao (modelo)
          super()
          __modelo = modelo
      fim

      metodos:
          ligar = funcao () __ligado = verdadeiro fim
          estatico desligar = funcao () __ligado = falso fim
          privado esta_ligado = () := __ligado igual a verdadeiro
    
  fim
`)
logAst(ast, true)
