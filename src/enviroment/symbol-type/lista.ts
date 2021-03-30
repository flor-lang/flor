import { QualquerFlor, QualquerFlorType, SymbolType } from "../symbol-type";
import { BooleanoFlor } from "./booleano";
import { FuncaoFlor } from "./funcao";
import { NumeroFlor } from "./numero";
import { TextoFlor } from "./texto";

export type ListaTypeParameter = { type: QualquerFlorType };

const tamanho = (_: ListaFlorType) => NumeroFlor;

const concatenar = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: _.parameter.type }),
    args: [{
      name: 'com',
      type: _.from({ type: _.parameter.type }),
    }]
  })

const verificar_todo_elemento = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: BooleanoFlor,
          args: [
            {
              name: 'elemento',
              type: _.parameter.type
            },
            {
              name: 'indice',
              type: NumeroFlor,
            }
          ]
        })
      }
    ]
  })

const preencher_com = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: _.parameter.type }),
    args: [
      { name: 'valor', type: _.parameter.type },
      { name: 'inicio', type: NumeroFlor },
      { name: 'fim', type: NumeroFlor },
    ]
  })

const filtrar = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: _.parameter.type }),
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: BooleanoFlor,
          args: [
            {
              name: 'elemento',
              type: _.parameter.type
            },
            {
              name: 'indice',
              type: NumeroFlor,
            }
          ]
        })
      }
    ]
  })

const encontrar = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.parameter.type,
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: BooleanoFlor,
          args: [
            {
              name: 'elemento',
              type: _.parameter.type
            },
            {
              name: 'indice',
              type: NumeroFlor,
            }
          ]
        })
      }
    ]
  })

const encontrar_indice = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: BooleanoFlor,
          args: [
            {
              name: 'elemento',
              type: _.parameter.type
            },
            {
              name: 'indice',
              type: NumeroFlor,
            }
          ]
        })
      }
    ]
  })

const para_cada = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: null,
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: null,
          args: [
            {
              name: 'elemento',
              type: _.parameter.type
            },
            {
              name: 'indice',
              type: NumeroFlor,
            }
          ]
        })
      }
    ]
  })

const possui = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [{
      name: 'elemento',
      type: _.parameter.type
    }]
  })

const indice = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [{
      name: 'elemento',
      type: _.parameter.type
    }]
  })

const unir_em_texto = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: TextoFlor,
    args: [{
      name: 'separador',
      type: TextoFlor
    }]
  })

const ultimo_indice = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [{
      name: 'elemento',
      type: _.parameter.type
    }]
  })

const mapear = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: QualquerFlor }),
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: QualquerFlor,
          args: [
            {
              name: 'elemento',
              type: _.parameter.type
            },
            {
              name: 'indice',
              type: NumeroFlor,
            }
          ]
        })
      }
    ]
  })

const remover_ultimo_elemento = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.parameter.type,
    args: []
  })

const adicionar = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [{
      name: 'elemento',
      type: _.parameter.type
    }]
  })

const reduzir = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: QualquerFlor,
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: QualquerFlor,
          args: [
            {
              name: 'valor_acumulado',
              type: QualquerFlor
            },
            {
              name: 'elemento',
              type: _.parameter.type,
            },
            {
              name: 'indice',
              type: NumeroFlor,
            }
          ]
        })
      },
      {
        name: 'valor_inicial',
        type: QualquerFlor
      }
    ]
  })

const inverter = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: _.parameter.type }),
    args: []
  })

const remover_primeiro_elemento = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.parameter.type,
    args: []
  })

const obter_sublista = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: _.parameter.type }),
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

const verificar_algum_elemento = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: BooleanoFlor,
          args: [
            {
              name: 'elemento',
              type: _.parameter.type
            },
            {
              name: 'indice',
              type: NumeroFlor,
            }
          ]
        })
      }
    ]
  })

const ordenar = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: _.parameter.type }),
    args: [
      {
        name: 'fn',
        type: FuncaoFlor.from({
          returnType: NumeroFlor,
          args: [
            {
              name: 'elemento_a',
              type: _.parameter.type
            },
            {
              name: 'elemento_b',
              type: _.parameter.type,
            }
          ]
        })
      }
    ]
  })

const remover_elementos = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: _.parameter.type }),
    args: [
      {
        name: 'inicio',
        type: NumeroFlor
      },
      {
        name: 'numero_de_remocoes',
        type: NumeroFlor
      }
    ]
  })

const adicionar_no_inicio = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: NumeroFlor,
    args: [{
      name: 'elemento',
      type: _.parameter.type
    }]
  })

const inserir = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: null,
    args: [
      {
        name: 'elemento',
        type: _.parameter.type
      },
      {
        name: 'posicao',
        type: NumeroFlor
      }
    ]
  })

const remover_elemento = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: _.parameter.type }),
    args: [
      {
        name: 'posicao',
        type: NumeroFlor
      }
    ]
  })

const e_lista = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [{
      name: 'lista',
      type: _.from({ type: _.parameter.type })
    }]
  })

const serie = (_: ListaFlorType) => FuncaoFlor
  .from({
    returnType: _.from({ type: NumeroFlor }),
    args: [
      {
        name: 'inicio',
        type: NumeroFlor
      },
      {
        name: 'tamanho',
        type: NumeroFlor
      },
      {
        name: 'passo',
        type: NumeroFlor
      }
    ]
  })

class ListaFlorType extends SymbolType<ListaTypeParameter> {
  name = 'lista'

  staticAttributes() {
    return {
      e_lista: e_lista(this),
      serie: serie(this),
    }
  }

  attributes () {
    return {
      tamanho: tamanho(this),
      concatenar: concatenar(this),
      verificar_todo_elemento: verificar_todo_elemento(this),
      preencher_com: preencher_com(this),
      filtrar: filtrar(this),
      encontrar: encontrar(this),
      encontrar_indice: encontrar_indice(this),
      para_cada: para_cada(this),
      possui: possui(this),
      indice: indice(this),
      unir_em_texto: unir_em_texto(this),
      ultimo_indice: ultimo_indice(this),
      mapear: mapear(this),
      remover_ultimo_elemento: remover_ultimo_elemento(this),
      adicionar: adicionar(this),
      reduzir: reduzir(this),
      inverter: inverter(this),
      remover_primeiro_elemento: remover_primeiro_elemento(this),
      obter_sublista: obter_sublista(this),
      verificar_algum_elemento: verificar_algum_elemento(this),
      ordernar: ordenar(this),
      remover_elementos: remover_elementos(this),
      adicionar_no_inicio: adicionar_no_inicio(this),
      inserir: inserir(this),
      remover_elemento: remover_elemento(this),
    }
  }
}

export const ListaFlor = new ListaFlorType();
