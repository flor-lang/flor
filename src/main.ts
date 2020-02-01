// Playground code
// import { logAst } from './utils/logger'
import { Program } from './parsers/program'
import { symbolTableByParentMethod } from './semantics/temp-symbol-table'

process.env.PARSE_ENV = 'MAIN'

/* const ast = */ Program.parse(
  `
    valor = 5
    fatorial = 1

    se valor < 0 entao
      mensagem = "Valor não pode ser negativo"
    senao
      para i de 1 ate valor faca
        fatorial = fatorial * i
      fim
      mensagem = "O Fatorial de {valor} é {fatorial}"
    fim
      
    console_escrever = mensagem
    `
)

// logAst(ast, true)

const symbolTable = symbolTableByParentMethod()
console.log('Symbol Table')
console.log(symbolTable)
