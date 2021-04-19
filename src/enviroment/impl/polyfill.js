const __vld_null__ = (x, o, y) => {
  if (typeof x === 'undefined' || x === null) {
    throw new Error(`Lado esquerdo da operação '${o}' é um atributo indefinido ou é nulo`)
  }
  if (typeof y === 'undefined' || y === null) {
    throw new Error(`Lado direito da operação '${o}' é um atributo indefinido ou é nulo`)
  }
}
const __vld_num_op__ = (x, o, y) => {
  const _ = __isBrowser__() ? window : process;
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error(`Operador '${o}' não pode ser aplicado entre ${
      typeof _.tipo === 'function' ? `os tipos ${_.tipo(x)} e ${_.tipo(y)
      }` : 'tipos não numéricos'}`)
  }
}
const __dsc_o__ = (o) => typeof o.descricao === 'function' ? o.descricao() : o.toString()
const __sum__ = (x, o, y) => {
  __vld_null__(x, o, y);
  if (o === '+' && (typeof x === 'string' || typeof y === 'string')) {
    return __dsc_o__(x) + __dsc_o__(y);
  }
  __vld_num_op__(x, o, y);
  return o === '+' ? x + y : x - y;
}
const __term__ = (x, o, y) => {
  __vld_null__(x, o, y);
  __vld_num_op__(x, o, y);
  return o === '*' ? x * y : x / y;
}
