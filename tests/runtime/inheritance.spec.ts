import { runFlorFile } from "../utils"

test('inheritance attibute init', done => {
  const compile = (path: string) => {
    const heranca = require(path)
    const filha = new heranca.Filha()
    expect(filha.atributo).toBe('mae')
    done()
  }
  runFlorFile('heranca.flor', { compile })
})

test('inheritance with no class data', done => {
  const stderr = (input: string) => {
    if (!input || input === 'Erro na execução:') return;
    expect(input).toContain(
      "Objeto 'Nomeavel' não é uma classe para configurar uma herança")
    done()
  }
  runFlorFile('herdar_nao_classe.flor', { stderr })
})
