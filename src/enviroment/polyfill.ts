export enum Polyfill {
  CTD_EXPR = 'const __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;',
  NULL_CLSC = 'const __nullish_coalesce__=(l,_=null)=>null==l?_:l;',
  EXPR = 'const expr=_=>__nullish_coalesce__(_);'
}

export const PolyfillDependenciesMap: [Polyfill, Polyfill[]][] = [
  [Polyfill.CTD_EXPR, []],
  [Polyfill.NULL_CLSC, []],
  [Polyfill.EXPR, [Polyfill.NULL_CLSC]]
]
