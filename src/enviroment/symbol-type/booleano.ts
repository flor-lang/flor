import { SymbolType } from "../symbol-type";

export class BooleanoFlorType extends SymbolType<unknown> {
  name = 'booleano'
}

export const BooleanoFlor = new BooleanoFlorType()
