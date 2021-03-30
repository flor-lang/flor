export class SymbolType <T> {
  name: string = 'qualquer';
  parameter: T = null;
  
  constructor(type?: Partial<SymbolType<T>>) {
    Object.assign(this, type || {});
  }

  staticAttributes(): { [key: string]: SymbolType<any> } {
    return {}
  };

  attributes(): { [key: string]: SymbolType<any> } {
    return {}
  };

  from (parameter: T): SymbolType<T> {
    return { ...this, parameter };
  }

}

export type QualquerFlorType = SymbolType<any>;
export const QualquerFlor = new SymbolType<any>();