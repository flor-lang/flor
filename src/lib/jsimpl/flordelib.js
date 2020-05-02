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

__old_array_to_string__ = Array.prototype.toString
Array.prototype.ordenar = Array.prototype.sort
Array.prototype.toString = function () {
  return `[${this.__old_array_to_string__()}]`
}

/** **************************************************************************** */

/**
 * Dicionarios: Object|Dictionary
 */

Object.prototype.toString = function () {
  return this
}

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
