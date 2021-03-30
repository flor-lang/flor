import { QualquerFlorType, SymbolType } from "../symbol-type";

export type DicionarioTypeParameter = { valueType: QualquerFlorType };

export class DicionarioFlorType extends SymbolType<DicionarioTypeParameter> {
  name = 'dicionario'
}

export const DicionarioFlor = new DicionarioFlorType()
