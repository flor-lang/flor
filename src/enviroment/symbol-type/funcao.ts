import { SymbolType } from "../symbol-type";

export type FuncaoTypeParameter = {
  returnType: SymbolType<any>,
  args: {
    name: string,
    type: SymbolType<any>
  }[]
}

export class FuncaoFlorType extends SymbolType<FuncaoTypeParameter> {
  name = 'funcao'
}

export const FuncaoFlor = new FuncaoFlorType();
