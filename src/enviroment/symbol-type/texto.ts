import { QualquerFlorType, SymbolType } from "../symbol-type";
import { BooleanoFlor } from "./booleano";
import { FuncaoFlor } from "./funcao";
import { ListaFlor } from "./lista";
import { NumeroFlor } from "./numero";

const tamanho = (_: TextoFlorType) => NumeroFlor;

const letra_na = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: [{
      name: 'posicao',
      type: NumeroFlor
    }]
  })

const unicode_da_letra_na = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [{
      name: 'indice',
      type: NumeroFlor
    }]
  })

const concatenar = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: [{
      name: 'texto',
      type: _
    }]
  })

const termina_com = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [{
      name: 'texto',
      type: _
    }]
  })

const possui = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [{
      name: 'texto',
      type: _
    }]
  })

const indice = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [{
      name: 'texto',
      type: _
    }]
  })

const ultimo_indice = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [{
      name: 'texto',
      type: _
    }]
  })

const normalizar = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: [{
      name: 'forma',
      type: _
    }]
  })

const substituir = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: [
      {
        name: 'texto',
        type: _
      },
      {
        name: 'por',
        type: _
      }
    ]
  })

const substituir_todos = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: [
      {
        name: 'texto',
        type: _
      },
      {
        name: 'por',
        type: _
      }
    ]
  })

const pesquisar_por = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [{
      name: 'texto',
      type: _
    }]
  })

const obter_subtexto = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: [
      {
        name: 'inicio',
        type: NumeroFlor
      },
      {
        name: 'fim',
        type: NumeroFlor
      }
    ]
  })

const dividir_texto_por = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: ListaFlor.from({ type: _ }),
    args: [{
      name: 'separador',
      type: _
    }]
  })

const inicia_com = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [{
      name: 'texto',
      type: _
    }]
  })

const minusculo = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: []
  })

const maiusculo = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: []
  })

const remover_espacos_das_laterais = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: []
  })

const remover_espacos_a_esquerda = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: []
  })

const remover_espacos_a_direita = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: []
  })

const do_unicode = (_: TextoFlorType) => FuncaoFlor
  .from({
    returnType: _,
    args: [{
      name: 'codigo',
      type: NumeroFlor,
    }]
  })

class TextoFlorType extends SymbolType<unknown> {
  name = 'texto'

  staticAttributes(): { [key: string]: QualquerFlorType } {
    return {
      do_unicode: do_unicode(this)
    }
  }

  attributes(): { [key: string]: QualquerFlorType } {
    return {
      tamanho: tamanho(this),
      letra_na: letra_na(this),
      unicode_da_letra_na: unicode_da_letra_na(this),
      concatenar: concatenar(this),
      termina_com: termina_com(this),
      possui: possui(this),
      indice: indice(this),
      ultimo_indice: ultimo_indice(this),
      normalizar: normalizar(this),
      substituir: substituir(this),
      substituir_todos: substituir_todos(this),
      pesquisar_por: pesquisar_por(this),
      obter_subtexto: obter_subtexto(this),
      dividir_texto_por: dividir_texto_por(this),
      inicia_com: inicia_com(this),
      minusculo: minusculo(this),
      maiusculo: maiusculo(this),
      remover_espacos_das_laterais: remover_espacos_das_laterais(this),
      remover_espacos_a_esquerda: remover_espacos_a_esquerda(this),
      remover_espacos_a_direita: remover_espacos_a_direita(this),
    }
  }
}

export const TextoFlor = new TextoFlorType()
