import * as P from 'parsimmon'

declare module 'parsimmon' {
  export interface Parser<T> {
    named(name: string): [never, P.Parser<never>];

		assert(condition: (result: string) => boolean, errorMessage: string): Parser<T>;
  }
}

function named (name: string): [never, P.Parser<never>] {
  return [name as never, this as P.Parser<never>]
}

P.Parser.prototype.named = named
