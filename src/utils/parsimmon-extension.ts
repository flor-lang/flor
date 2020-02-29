import * as P from 'parsimmon'

declare module 'parsimmon' {
  export interface Parser<T> {

    /**
     * Passes the result of parser to the function condition, which returns a boolean.
     * If the the condition is false, returns a failed parse with the given message.
     * Else is returns the original result of parser.
     *
     * @param condition function to evaluate parse condition
     * @param errorMessage message returned with failed parse
     */
    assert (condition: (result: T) => boolean, errorMessage: string): Parser<T>;

    /**
     * Identify the object in seqMap. The result ast will be stored
     * in a property of parser that contain the sequence that this analyzer is part of
     * @param name property name to identify the object in seqMap
     */
    named (name: string): [never, P.Parser<never>];

    /**
     * Returns a parser putting mandatory whitespace around it
     */
    wspc<T> (): P.Parser<[string, T, string]>;

    /**
     * Returns a parser putting optoinal whitespace around it
     */
    optWspc<T> (): P.Parser<[string, T, string]>;

    /**
     * Returns parser to handle many elements separated by comma wrapped by string parsers
     *
     * @param separator separator string
     * @param before before string character
     * @param after after string character
     */
    sepWrp<T> (separator: string, before: string, after: string): P.Parser<T>;

  }
}

P.Parser.prototype.named = function (name: string): [never, P.Parser<never>] {
  return [name as never, this as P.Parser<never>]
}

P.Parser.prototype.wspc = function<T> (): P.Parser<[string, T, string]> {
  return P.seq(
    P.regexp(/(^|\s)+/),
    this,
    P.regexp(/(\s|$)+/)
  )
}

P.Parser.prototype.optWspc = function<T> (): P.Parser<[string, T, string]> {
  return P.seq(
    P.optWhitespace,
    this,
    P.optWhitespace
  )
}

P.Parser.prototype.sepWrp = function<T> (separator: string, before: string, after: string): P.Parser<T> {
  return this
    .sepBy(P.string(separator).optWspc())
    .wrap(P.string(before).optWspc(), P.string(after).optWspc())
}
