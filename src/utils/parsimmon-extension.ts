import * as P from 'parsimmon'

declare module 'parsimmon' {
  export interface Parser<T> {
    namedParser(name: string): [never, P.Parser<never>];
  }
}

function namedParser (name: string): [never, P.Parser<never>] {
  return [name as never, this as P.Parser<never>]
}

P.Parser.prototype.namedParser = namedParser
