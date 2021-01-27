import { cwd } from "process"

/**
 * JS Implementation of Flor Standard Lib
 */
export const StandardLibJSImpl = (scope: NodeJS.Global | Window) => {// Standard LIB Definitions
/** **************************************************************************** */
const _ = scope

/**
 * Texto: String
 */

// Statics
Object.defineProperty(_, 'Texto', {
  value: {
    do_unicode: String.fromCharCode
  },
  writable: false
})


// Prototype Definitions
Object.defineProperties(String.prototype, {
  tamanho: { get: function () { return this.length } },
  letra_na: { value: String.prototype.charAt },
  unicode_da_letra_na: { value:  String.prototype.charCodeAt },
  concatenar: { value:  String.prototype.concat },
  termina_com: { value:  String.prototype.endsWith },
  possui: { value:  String.prototype.includes },
  indice: { value:  String.prototype.indexOf },
  ultimo_indice: { value:  String.prototype.lastIndexOf },
  normalizar: { value:  String.prototype.normalize },
  substituir: { value:  String.prototype.replace },
  pesquisar_por: { value:  String.prototype.search },
  obter_subtexto: { value:  String.prototype.substring },
  dividir_texto_por: { value:  String.prototype.split },
  inicia_com: { value:  String.prototype.startsWith },
  minusculo: { value:  String.prototype.toLowerCase },
  maiusculo: { value:  String.prototype.toUpperCase },
  remover_espacos_das_laterais: { value:  String.prototype.trim },
  remover_espacos_a_esquerda: { value:  String.prototype.trimLeft },
  remover_espacos_a_direita: { value:  String.prototype.trimRight },
})

/** **************************************************************************** */

/**
 * Numeros: Numbers
 */

// Statics
Object.defineProperty(_, 'Numero', {
  value: {
    EPSILON: Number.EPSILON,
    VALOR_MAX: Number.MAX_VALUE,
    VALOR_MIN: Number.MIN_VALUE,
    INFINITO_POSITIVO: Number.POSITIVE_INFINITY,
    INFINITO_NEGATIVO: Number.NEGATIVE_INFINITY,
    NaN: Number.NaN,
    e_finito: Number.isFinite,
    e_inteiro: Number.isInteger,
    e_NaN: Number.isNaN
  },
  writable: false
})

// Prototype Definitions
Object.defineProperties(Number.prototype, {
  com_n_casas_decimais: { value: Number.prototype.toFixed },
  notacao_cientifica: {
    value() {
      const exponential = this.toExponential()
      return exponential.replace('e', ' x 10^')
    }
  }
});

/** **************************************************************************** */

/**
 * Booleanos: Booleans
 */

Boolean.prototype.toString = function () {
  return `${this.valueOf() === true ? 'verdadeiro' : 'falso'}`
}

/** **************************************************************************** */

/**
 * Listas: Arrays
 */

// Statics
Object.defineProperty(_, 'Lista', {
  value: {
    e_lista: Array.isArray,
    serie: (inicio: number, tamanho: number, passo = 1) => Array
      .from(Array(tamanho).keys())
      .map(i => passo * i + inicio)
  },
  writable: false 
})

// Prototype Definitions
Object.defineProperties(Array.prototype, {
  tamanho: { get: function () { return this.length } },
  concatenar: { value:  Array.prototype.concat },
  verificar_todo_elemento: { value:  Array.prototype.every },
  preencher_com: { value:  Array.prototype.fill },
  filtrar: { value:  Array.prototype.filter },
  encontrar: { value:  Array.prototype.find },
  encontrar_indice: { value:  Array.prototype.findIndex },
  para_cada: { value:  Array.prototype.forEach },
  possui: { value:  Array.prototype.includes },
  indice: { value:  Array.prototype.indexOf },
  unir_em_texto: { value:  Array.prototype.join },
  ultimo_indice: { value:  Array.prototype.lastIndexOf },
  mapear: { value:  Array.prototype.map },
  remover_ultimo_elemento: { value:  Array.prototype.pop },
  adicionar: { value:  Array.prototype.push },
  reduzir: { value:  Array.prototype.reduce },
  inverter: { value:  Array.prototype.reverse },
  remover_primeiro_elemento: { value:  Array.prototype.shift },
  obter_sublista: { value:  Array.prototype.slice },
  verificar_algum_elemento: { value:  Array.prototype.some },
  ordenar: { value:  Array.prototype.sort },
  remover_elementos: { value:  Array.prototype.splice },
  adicionar_no_inicio: { value:  Array.prototype.unshift },
  __old_array_to_string__: { value: Array.prototype.toString },
  inserir: {
    value(elemento: any, posicao: number) {
      return this.splice(posicao, 0, elemento)
    }
  },
  remover_elemento: {
    value(posicao: number) {
      return this.splice(posicao, 1)
    }
  }
})

Array.prototype.toString = function () {
  return `[${this.__old_array_to_string__()}]`
}

/** **************************************************************************** */

/**
 * Dicionarios: Object|Dictionary
 */

// Prototype Declarations
Object.defineProperties(Object.prototype, {
  possui: { value: Object.prototype.hasOwnProperty }
})

// Prototype overrides
let __object_stringify_depth__ = 0
Object.prototype.toString = function () {
  let str = ''

  if (this.descricao) {
    return this.descricao()
  }

  if (this.constructor.name !== 'Object') {
    __object_stringify_depth__ += 1
    const closeIdent = Array(__object_stringify_depth__ - 1).fill('    ').join('')
    const ident = closeIdent + '    '
    const entries = Object.entries(this)
    const lastIndex = entries.length - 1
    const body = entries.reduce((prev, curr, index) => {
      let prop = curr[0].toString()
      if (prop.endsWith('_')) {
          prop = prop.substring(0, prop.length - 1)
      }
      return prev + ident + prop + ' => '
        + (curr[1] ? curr[1].toString() : 'nulo')
        + (index !== lastIndex ? '\n' : '')
    }, '')
    str = this.constructor.name + ' :: {\n' + body + '\n' + closeIdent + '}'
  } else {
    str = JSON.stringify(this, null, 2)
  }

  __object_stringify_depth__ = 0
  return str
}

/** **************************************************************************** */

/**
 * Conjunto: Set
 */
class Conjunto<T> {
  private _list: T[]

  constructor(list?: T[]) {
    this._list = []
    if (list) {
      list.forEach((el: T) => this.adicionar(el))
    }
  }

  get tamanho(): number {
    return this._list.length;
  }

  adicionar(elemento: T): void {
    if (!this.contem(elemento)) {
      this._list.push(elemento)
    }
  }

  remover(elemento: T) {
    const posicao = this._list.indexOf(elemento);
    if (posicao > -1) {
      this._list.splice(posicao, 1)
    }
  }


  uniao(conjunto: Conjunto<T>): Conjunto<T> {
    const novoConjunto = new Conjunto(this.valores());
    conjunto.valores().forEach(valor => {
      novoConjunto.adicionar(valor)
    });
    return novoConjunto;
  }

  intercecao(conjunto: Conjunto<T>): Conjunto<T> {
    const valores = conjunto.valores().filter(valor => this.contem(valor));
    return new Conjunto(valores);
  }

  diferenca(conjunto: Conjunto<T>): Conjunto<T> {
    const valores = this.valores().filter(valor => !conjunto.contem(valor));
    return new Conjunto(valores);
  }

  contem(elemento: T): boolean { return this._list.includes(elemento); }
  para_cada(callbackfn: (e: T, i?: number) => void) { this._list.forEach(callbackfn); }
  limpar() { this._list = []; }
  valores() { return this._list; }
  descricao() { return `Conjunto :: ${this.valores()}`; }

}

Object.defineProperty(_, 'Conjunto', {
  value: Conjunto,
  writable: false 
})

/** **************************************************************************** */

/**
 * Fila: Queue
 */
class Fila<T> {
  private _list: T[];
  constructor(list?: T[]) { this._list = list || []; }

  get tamanho(): number {
    return this._list.length;
  }

  enfileirar(elemento: T): void { this._list.push(elemento); }
  desenfileirar() { this._list.shift(); }
  contem(elemento: T): boolean { return this._list.includes(elemento); }
  para_cada(callbackfn: (e: T, i?: number) => void) { this._list.forEach(callbackfn) }
  valores() { return this._list; }
  descricao() { return `Fila :: ${this.valores()}` }
}

Object.defineProperty(_, 'Fila', {
  value: Fila,
  writable: false 
})

/** **************************************************************************** */

/**
 * Fila: Queue
 */
class Pilha<T> {
  private _list: T[];
  constructor(list?: T[]) { this._list = list || []; }

  get tamanho(): number {
    return this._list.length;
  }

  empilhar(elemento: T): void { this._list.push(elemento); }
  desempilhar() { this._list.pop(); }
  contem(elemento: T): boolean { return this._list.includes(elemento); }
  para_cada(callbackfn: (e: T, i?: number) => void) { this._list.forEach(callbackfn) }
  valores() { return this._list; }
  descricao() { return `Pilha :: ${this.valores()}` }
}

Object.defineProperty(_, 'Pilha', {
  value: Pilha,
  writable: false 
})

/** **************************************************************************** */

/**
 * Matematica: Math
 */

// Aliases Declarations
Object.defineProperties(Math, {
  absoluto: { value:  Math.abs },
  arco_cosseno: { value:  Math.acos },
  arco_cosseno_hiperbolico: { value:  Math.acosh },
  arco_seno: { value:  Math.asin },
  arco_seno_hiperbolico: { value:  Math.asinh },
  arco_tangente: { value:  Math.atan },
  arco_tangente_2: { value:  Math.atan2 },
  arco_tangente_hiperbolico: { value:  Math.atanh },
  raiz_cubica: { value:  Math.cbrt },
  teto_de: { value:  Math.ceil },
  cosseno: { value:  Math.cos },
  cosseno_hiperbolico: { value:  Math.cosh },
  c_euler_el: { value:  Math.exp },
  e_el: { value:  Math.exp },
  chao: { value:  Math.floor },
  hipotenusa: { value:  Math.hypot },
  log_base_10: { value:  Math.log10 },
  log_base_2: { value:  Math.log2 },
  el: { value:  Math.pow },
  elevar: { value:  Math.pow },
  num_aleatorio: { value:  Math.random },
  arredondar: { value:  Math.round },
  sinal: { value:  Math.sign },
  seno: { value:  Math.sin },
  seno_hiperbolico: { value:  Math.sinh },
  raiz: { value:  Math.sqrt },
  raiz_quadrada: { value:  Math.sqrt },
  tangente: { value:  Math.tan },
  tangente_hiperbolica: { value:  Math.tanh },
  truncar: { value:  Math.trunc },
})


// _.Matematica = Math
Object.defineProperty(_, 'Matematica', {
  value: Math, writable: false
})

/** **************************************************************************** */

/**
 * FlorJS: Utilitário JS
 */
class FlorJS {

  static argumentos() {
    return process ? process.argv.slice(2) : [];
  }

  static variavel_externa(identificador: string, retornoPadrao: any) {
    const variavel = (_ as any)[identificador];
    if (variavel === undefined) {
      return retornoPadrao !== undefined ? retornoPadrao : (function() {
        throw new Error(`Variável '${identificador}' não foi declarada em nenhum módulo/script externo`)
      })();
    }
    return variavel;
  }

  static variavel_de_ambiente(variavel: string) {
    return process && process.env[variavel] ? process.env[variavel] : null;
  }

  static executar(fn: () => void, segundos: number = 0, argumentos: any[]) {
    setTimeout(fn, segundos * 1000, argumentos);
  }

  static finalizar_aplicacao(mensagem: string, codigo: number) {
    if (process) {
      console.log(mensagem);
      process.exit(codigo);
    }
  }

}

Object.defineProperty(_, 'FlorJS', {
  value: FlorJS,
  writable: false 
})

/** **************************************************************************** */

/**
 * Global
 */
const txt = (arg: any) => arg.toString()
const bool = (arg: any) => new Boolean(arg).valueOf()
const list = (arg: any) => Array.from(arg)
const dic = (arg: any) => JSON.parse(arg)
const num = (arg: any) => new Number(arg).valueOf()
const int = parseInt
const real = parseFloat

const importar = function (path: string) {
  try {
    return require(cwd() + '/' + path);
  } catch (error) {
    console.log(error);
    return null;
  }
}

const escrever = function (message: any) {
  let log = ''
  if (typeof message === 'undefined') {
    log = '\nErro na escrita:\n  Atributo não definido'
  } else if (message === null) {
    log = 'nulo'
  } else if (message === Number.POSITIVE_INFINITY) {
    log = 'Infinito'
  } else if (message === Number.NEGATIVE_INFINITY) {
    log = '-Infinito'
  } else {
    try {
      log = message.toString()
    } catch (error) {
      log = message
    }
  }
  console.log(log)
}

const FlorRuntimeErrorMessage = (error: Error): string => {
  let __florErrorMessage__ = error.message

  if (error instanceof TypeError) {
    if (error.message.endsWith('is not a function')) {
      __florErrorMessage__ = error.message.replace(
        'is not a function', 'não é uma função'
      )
    }

    if (error.message.startsWith('Cannot read property')) {
      __florErrorMessage__ = error.message.replace(
        'Cannot read property', 'Váriavel'
      )
      if (error.message.endsWith('of undefined')) {
        __florErrorMessage__ = __florErrorMessage__.replace(
          'of undefined', 'não pode ser lida de um objeto não existente'
        )
      }
      if (error.message.endsWith('of null')) {
        __florErrorMessage__ = __florErrorMessage__.replace(
          'of null', 'não pode ser lida de um objeto nulo'
        )
      }
    }
  }

  if (error instanceof ReferenceError) {
    if (error.message.endsWith('is not defined')) {
      __florErrorMessage__ = error.message.replace(
        'is not defined', 'não foi definida'
      )
    }
  }

  return `\nErro na execução:\n  ${__florErrorMessage__}`
}

Object.defineProperties(_, {
  txt: { value: txt, writable: false },
  bool: { value: bool, writable: false },
  list: { value: list, writable: false },
  dic: { value: dic, writable: false },
  num: { value: num, writable: false },
  int: { value: int, writable: false },
  real: { value: real, writable: false },
  importar: { value: importar, writable: false },
  escrever: { value: escrever, writable: false },
  FlorRuntimeErrorMessage: { value: FlorRuntimeErrorMessage, writable: false },
})

}
