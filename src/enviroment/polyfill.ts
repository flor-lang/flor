export enum Polyfill {
  CTD_EXPR = "cdt_expr:(_,c,l,n)=>typeof n !== 'undefined'?c?l:n:c?l:_||null",
  NULL_CLSC = 'nullish_coalesce:(l,_=null)=>null==l?_:l',
  EXPR = 'expr:_=>__pf__.nullish_coalesce(_)',
  IS_BROWSER = 'isBrowser:new Function("try {return this===window;}catch(e){return false;}")',
  EXPORTS = 'exports:(obj)=>{if(__pf__.isBrowser()){Object.assign(window,obj)}if(module){module.exports=obj}}',
  IMPORT = 'import:function(path){try{return require(path)}catch(error){return null}}',
  INTERFACE_IMPL_VLDT = "validateInterfaceImpl:(e,a,n)=>{if(!a.__props__.every(e=>n.includes(e)))throw new Error(`Existe atributos definidos pela interface '${a.nome}'`+` não implementados na classe '${e}'`)}",
  INHERITANCE_VLDT = "validateInheritance:(c,d)=>{if(!c||!('__propertiesDeclarations__' in c))throw new Error(`Objeto '${d}' não é uma classe para configurar uma herança`)}",
  INTERFACE_VLDT = "validateInterface:(e,a)=>{if(!e||!('__props__' in e))throw new Error(`Objeto '${a}' não é uma interface para implementar em uma classe`)}",
  VLD_NULL = "vld_null:(o,r,i)=>{if(null==o)throw new Error(`Lado esquerdo da operação '${r}' é um atributo indefinido ou é nulo`);if(null==i)throw new Error(`Lado direito da operação '${r}' é um atributo indefinido ou é nulo`)}",
  VLD_NUM_OP = 'vld_num_op:(o,e,r)=>{const n=__pf__.isBrowser()?window:process;if("number"!=typeof o||"number"!=typeof r)throw new Error(`Operador \'${e}\' não pode ser aplicado entre ${"function"==typeof n.tipo?`os tipos ${n.tipo(o)} e ${n.tipo(r)}`:"tipos não numéricos"}`)}',
  DSC_O = 'dsc_o:c=>"function"==typeof c.descricao?c.descricao():c.toString()',
  ADD = 'add:(_,o,s)=>(__pf__.vld_null(_,o,s),"+"!==o||"string"!=typeof _&&"string"!=typeof s?(__pf__.vld_num_op(_,o,s),"+"===o?_+s:_-s):__pf__.dsc_o(_)+__pf__.dsc_o(s))',
  TERM = 'term:(_,l,n)=>(__pf__.vld_null(_,l,n),__pf__.vld_num_op(_,l,n),"*"===l?_*n:_/n)'
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
  [Polyfill.INTERFACE_VLDT, []],
  [Polyfill.VLD_NULL, []],
  [Polyfill.VLD_NUM_OP, [Polyfill.IS_BROWSER]],
  [Polyfill.DSC_O, []],
  [Polyfill.ADD, [Polyfill.VLD_NULL, Polyfill.DSC_O, Polyfill.VLD_NUM_OP]],
  [Polyfill.TERM, [Polyfill.VLD_NULL, Polyfill.VLD_NUM_OP]],
]
