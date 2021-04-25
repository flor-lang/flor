import { runFlorFile } from "../utils";

test('interface definition', done => {
  const stderr = (input: string) => {
    console.log(input)
    if (!input || input === 'Erro na execução:') return;
    expect(input).toContain(
      "Existe atributos definidos pela interface 'Nomeavel' "
      + "não implementados na classe 'Aluno'")
    done()
  }
  runFlorFile('interfaces.flor', { stderr });
})

test('interface implementation with no interface data', done => {
  const stderr = (input: string) => {
    if (!input || input === 'Erro na execução:') return;
    expect(input).toContain(
      "Objeto 'Nomeavel' não é uma interface para implementar em uma classe")
    done()
  }
  runFlorFile('implementar_nao_interface.flor', { stderr });
})
