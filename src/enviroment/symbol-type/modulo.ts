import { QualquerFlorType, SymbolType } from "../symbol-type";

export type ModuloTypeParameter = {
  path: string;
  exports: { [key: string]: QualquerFlorType };
};

export class ModuloFlorType extends SymbolType<ModuloTypeParameter> {
  name = "modulo";

  staticAttributes(): { [key: string]: QualquerFlorType } {
    return {};
  }

  attributes(): { [key: string]: QualquerFlorType } {
    return this.parameter.exports;
  }
}
