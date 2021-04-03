export enum Polyfill {
  CTD_EXPR = 'const __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;',
  NULL_CLSC = 'const __nullish_coalesce__=(l,_=null)=>null==l?_:l;',
  EXPR = 'const __expr__=_=>__nullish_coalesce__(_);',
  IS_BROWSER = 'const __isBrowser__=new Function("try {return this===window;}catch(e){return false;}");',
  EXPORTS = 'const __exports__=(obj)=>{if(__isBrowser__()){Object.assign(window,obj)}if(module){module.exports=obj}};',
  IMPORT = 'const __import__=function(path){try{return require(path)}catch(error){return null}};',
  INTERFACE_IMPL_VLDT = "const __validateInterfaceImpl__=(e,a,n)=>{if(!a.__props__.every(e=>n.includes(e)))throw new Error(`Existe atributos definidos pela interface '${a.nome}'`+` não implementados na classe '${e}'`)};",
  INHERITANCE_VLDT = "const __validateInheritance__=(c,d)=>{if(!c||!('__propertiesDeclarations__' in c))throw new Error(`Objeto '${d}' não é uma classe para configurar uma herança`)};",
  INTERFACE_VLDT = "const __validateInterface__=(e,a)=>{if(!e||!('__props__' in e))throw new Error(`Objeto '${a}' não é uma interface para implementar em uma classe`)};",
}

export const PolyfillDependenciesMap: [Polyfill, Polyfill[]][] = [
  [Polyfill.CTD_EXPR, []],
  [Polyfill.NULL_CLSC, []],
  [Polyfill.EXPR, [Polyfill.NULL_CLSC]],
  [Polyfill.IS_BROWSER, []],
  [Polyfill.EXPORTS, [Polyfill.IS_BROWSER]],
  [Polyfill.IMPORT, []],
  [Polyfill.INTERFACE_IMPL_VLDT, []],
  [Polyfill.INHERITANCE_VLDT, []],
  [Polyfill.INTERFACE_VLDT, []]
]
