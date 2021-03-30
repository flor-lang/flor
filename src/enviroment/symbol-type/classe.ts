import { QualquerFlorType, SymbolType } from "../symbol-type";

export type ClasseTypeParameter = {
  name: string;
  attributes: { [key: string]: QualquerFlorType };
};

export class ClasseFlorType extends SymbolType<ClasseTypeParameter> {
  name = "classe";

  staticAttributes(): { [key: string]: QualquerFlorType } {
    return {};
  }

  attributes(): { [key: string]: QualquerFlorType } {
    return {};
  }
}
