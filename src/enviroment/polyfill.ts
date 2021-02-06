export enum Polyfill {
  CTD_EXPR = 'const __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;',
  NULL_CLSC = 'const __nullish_coalesce__=(l,_=null)=>null==l?_:l;',
  EXPR = 'const __expr__=_=>__nullish_coalesce__(_);',
  IS_BROWSER = 'const __isBrowser__=new Function("try {return this===window;}catch(e){return false;}");',
  EXPORTS = 'const __exports__=(obj)=>{if(__isBrowser__()){Object.assign(window,obj)}else if(module){module.exports=obj}};',
}

export const PolyfillDependenciesMap: [Polyfill, Polyfill[]][] = [
  [Polyfill.CTD_EXPR, []],
  [Polyfill.NULL_CLSC, []],
  [Polyfill.EXPR, [Polyfill.NULL_CLSC]],
  [Polyfill.IS_BROWSER, []],
  [Polyfill.EXPORTS, [Polyfill.IS_BROWSER]]
]
