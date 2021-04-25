const vld_null = (x, o, y) => {
  if (typeof x === 'undefined' || x === null) {
    throw new Error(`Lado esquerdo da operação '${o}' é um atributo indefinido ou é nulo`)
  }
  if (typeof y === 'undefined' || y === null) {
    throw new Error(`Lado direito da operação '${o}' é um atributo indefinido ou é nulo`)
  }
}
const vld_num_op = (x, o, y) => {
  const _ = isBrowser() ? window : global;
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error(`Operador '${o}' não pode ser aplicado entre ${
      typeof _.tipo === 'function' ? `os tipos ${_.tipo(x)} e ${_.tipo(y)
      }` : 'tipos não numéricos'}`)
  }
}
const dsc_o = (o) => typeof o.descricao === 'function' ? o.descricao() : o.toString()
const sum = (x, o, y) => {
  vld_null(x, o, y);
  if (o === '+' && (typeof x === 'string' || typeof y === 'string')) {
    return dsc_o(x) + dsc_o(y);
  }
  vld_num_op(x, o, y);
  return o === '+' ? x + y : x - y;
}
const term = (x, o, y) => {
  vld_null(x, o, y);
  vld_num_op(x, o, y);
  return o === '*' ? x * y : x / y;
}
