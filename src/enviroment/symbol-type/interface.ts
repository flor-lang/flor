import { QualquerFlorType, SymbolType } from "../symbol-type";

export type InterfaceTypeParameter = {
  name: string;
  definitions: { [key: string]: QualquerFlorType };
};

export class InterfaceFlorType extends SymbolType<InterfaceTypeParameter> {
  name = "interface";

  staticAttributes(): { [key: string]: QualquerFlorType } {
    return {};
  }

  attributes(): { [key: string]: QualquerFlorType } {
    return {};
  }
}
