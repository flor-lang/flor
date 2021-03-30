import { QualquerFlorType, SymbolType } from "../symbol-type";
import { BooleanoFlor } from "./booleano";
import { FuncaoFlor } from "./funcao";
import { TextoFlor } from "./texto";


const com_n_casas_decimais = (_: NumeroFlorType) => FuncaoFlor
  .from({
    returnType: TextoFlor,
    args: [{
      name: 'n',
      type: _
    }]
  })

const notacao_cientifica = (_: NumeroFlorType) => FuncaoFlor
  .from({
    returnType: TextoFlor,
    args: []
  })

const EPSILON = (_: NumeroFlorType) => _
const VALOR_MAX = (_: NumeroFlorType) => _
const VALOR_MIN = (_: NumeroFlorType) => _
const INFINITO_POSITIVO = (_: NumeroFlorType) => _
const INFINITO_NEGATIVO = (_: NumeroFlorType) => _
const NaN = (_: NumeroFlorType) => _

const e_finito = (_: NumeroFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [{
      name: 'n',
      type: _
    }]
  })

const e_inteiro = (_: NumeroFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [{
      name: 'n',
      type: _
    }]
  })

const e_NaN = (_: NumeroFlorType) => FuncaoFlor
  .from({
    returnType: BooleanoFlor,
    args: [{
      name: 'n',
      type: _
    }]
  })

export class NumeroFlorType extends SymbolType<unknown> {
  name = 'numero'

  staticAttributes(): { [key: string]: QualquerFlorType } {
    return {
      EPSILON: EPSILON(this),
      VALOR_MAX: VALOR_MAX(this),
      VALOR_MIN: VALOR_MIN(this),
      INFINITO_POSITIVO: INFINITO_POSITIVO(this),
      INFINITO_NEGATIVO: INFINITO_NEGATIVO(this),
      NaN: NaN(this),
      e_finito: e_finito(this),
      e_inteiro: e_inteiro(this),
      e_NaN: e_NaN(this),
    }
  }

  attributes(): { [key: string]: QualquerFlorType } {
    return {
      com_n_casas_decimais: com_n_casas_decimais(this),
      notacao_cientifica: notacao_cientifica(this)
    }
  }
}

export const NumeroFlor = new NumeroFlorType()
