// Standard LIB Definitions
/** **************************************************************************** */

/**
 * Texto: String
 */

// Statics
Texto = {
  do_unicode: String.fromCharCode
}

// Prototype Definitions
String.prototype.letra_na = String.prototype.charAt
String.prototype.unicode_da_letra_na = String.prototype.charCodeAt
String.prototype.concatenar = String.prototype.concat
String.prototype.termina_com = String.prototype.endsWith
String.prototype.possui = String.prototype.includes
String.prototype.indice = String.prototype.indexOf
String.prototype.ultimo_indice = String.prototype.lastIndexOf
String.prototype.normalizar = String.prototype.normalize
String.prototype.substituir = String.prototype.replace
String.prototype.pesquisar_por = String.prototype.search
String.prototype.obter_subtexto = String.prototype.substring
String.prototype.dividir_texto_por = String.prototype.split
String.prototype.inicia_com = String.prototype.startsWith
String.prototype.minusculo = String.prototype.toLowerCase
String.prototype.maiusculo = String.prototype.toUpperCase
String.prototype.remover_espacos_das_laterais = String.prototype.trim
String.prototype.remover_espacos_a_esquerda = String.prototype.trimLeft
String.prototype.remover_espacos_a_direita = String.prototype.trimRight

// Prototype Overrides
String.prototype.tamanho = function () {
  return this.length
}

/** **************************************************************************** */

/**
 * Numeros: Numbers
 */

// Statics
Numero = {
  EPSILON: Number.EPSILON,
  VALOR_MAX: Number.MAX_VALUE,
  VALOR_MIN: Number.MIN_VALUE,
  INFINITO_POSITIVO: Number.POSITIVE_INFINITY,
  INFINITO_NEGATIVO: Number.NEGATIVE_INFINITY,
  NaN: Number.NaN,
  e_finito: Number.isFinite,
  e_inteiro: Number.isInteger,
  e_NaN: Number.isNaN
}

// Prototype Definitions
Number.prototype.com_n_casas_decimais = Number.prototype.toFixed

// Prototype Overrides
Number.prototype.notacao_cientifica = function () {
  const exponential = this.toExponential()
  return exponential.replace('e', ' x 10^')
}

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
Lista = {
  e_lista: Array.isArray
}

// Prototype Definitions
Array.prototype.concatenar = Array.prototype.concat
Array.prototype.verificar_todo_elemento = Array.prototype.every
Array.prototype.preencher_com = Array.prototype.fill
Array.prototype.filtrar = Array.prototype.filter
Array.prototype.encontrar = Array.prototype.find
Array.prototype.encontrarIndice = Array.prototype.findIndex
Array.prototype.para_cada = Array.prototype.forEach
Array.prototype.possui = Array.prototype.includes
Array.prototype.indice = Array.prototype.indexOf
Array.prototype.unir_em_texto = Array.prototype.join
Array.prototype.ultimo_indice = Array.prototype.lastIndexOf
Array.prototype.mapear = Array.prototype.map
Array.prototype.remover_ultimo_elemento = Array.prototype.pop
Array.prototype.adicionar = Array.prototype.push
Array.prototype.reduzir = Array.prototype.reduce
Array.prototype.inverter = Array.prototype.reverse
Array.prototype.remover_primeiro_elemento = Array.prototype.shift
Array.prototype.obter_sublista = Array.prototype.slice
Array.prototype.verificar_algum_elemento = Array.prototype.some
Array.prototype.ordenar = Array.prototype.sort
Array.prototype.remover_elementos = Array.prototype.splice
Array.prototype.adicionar_no_inicio = Array.prototype.unshift


// Prototype Overrides
__old_array_to_string__ = Array.prototype.toString
Array.prototype.toString = function () {
  return `[${this.__old_array_to_string__()}]`
}

Array.prototype.inserir = function(elemento, posicao) {
  return this.splice(posicao, 0, elemento)
}

Array.prototype.remover_elemento = function(posicao) {
  return this.splice(posicao, 1)
}

Array.prototype.tamanho = function () {
  return this.length
}

/** **************************************************************************** */

/**
 * Dicionarios: Object|Dictionary
 */

// Prototype Declarations
Object.prototype.possui = Object.prototype.hasOwnProperty

// Prototype overrides
Object.prototype.toString = function () {
  return this
}

/** **************************************************************************** */

/**
 * Matematica: Math
 */

// Aliases Declarations
Math.absoluto = Math.abs
Math.arco_cosseno = Math.acos
Math.arco_cosseno_hiperbolico = Math.acosh
Math.arco_seno = Math.asin
Math.arco_seno_hiperbolico = Math.asinh
Math.arco_tangente = Math.atan
Math.arco_tangente_2 = Math.atan2
Math.arco_tangente_hiperbolico = Math.atanh
Math.raiz_cubica = Math.cbrt
Math.teto_de = Math.ceil
Math.cosseno = Math.cos
Math.cosseno_hiperbolico = Math.cosh
Math.c_euler_el = Math.exp
Math.e_el = Math.exp
Math.chao = Math.floor
Math.hipotenusa = Math.hypot
Math.log_base_10 = Math.log10
Math.log_base_2 = Math.log2
Math.el = Math.pow
Math.elevar = Math.pow
Math.num_aleatorio = Math.random
Math.arredondar = Math.round
Math.sinal = Math.sign
Math.seno = Math.sin
Math.seno_hiperbolico = Math.sinh
Math.raiz = Math.sqrt
Math.raiz_quadrada = Math.sqrt
Math.tangente = Math.tan
Math.tangente_hiperbolica = Math.tanh
Math.truncar = Math.trunc

Matematica = Math

/** **************************************************************************** */

/**
 * Global
 */

txt = (arg) => arg.toString()
bool = (arg) => new Boolean(arg)
list = (arg) => Array.from(arg)
dic = (arg) => JSON.parse(arg)
num = (arg) => new Number(arg)
int = parseInt
real = parseFloat

escrever = function (message) {
  let log = ''
  if (message === null) {
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
