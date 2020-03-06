/* eslint-disable @typescript-eslint/camelcase */
import { LibDeclaration } from './lib-declarations'

export const ListaDeclarations: LibDeclaration = {
  tamanho: {
    ref: 'length',
    tipo: 'numero' },

  indice: {
    ref: 'indexOf',
    tipo: {
      params: [['elemento', '*']],
      retorno: 'numero' } },

  ultimo_indice: {
    ref: 'lastIndexOf',
    tipo: {
      params: [['elemento', '*']],
      retorno: 'numero' } },

  concatenar: {
    ref: 'concat',
    tipo: {
      params: [['lista', 'lista']],
      retorno: 'lista' } },

  verificar_todos_os_elementos: {
    ref: 'every',
    tipo: {
      params: [['f', { params: [['*', '*']], retorno: 'booleano' }]],
      retorno: 'booleano' } },

  preencher_com: {
    ref: 'fill',
    tipo: {
      params: [['valor', '*'], ['da_posicao', 'numero'], ['a_posicao', 'numero']],
      retorno: 'lista' } },

  filtrar: {
    ref: 'filter',
    tipo: {
      params: [['f', { params: [['*', '*']], retorno: 'booleano' }]],
      retorno: 'lista' } },

  encontrar: {
    ref: 'find',
    tipo: {
      params: [['f', { params: [['*', '*']], retorno: 'booleano' }]],
      retorno: '*' } },

  encontrarIndice: {
    ref: 'findIndex',
    tipo: {
      params: [['f', { params: [['*', '*']], retorno: 'booleano' }]],
      retorno: 'numero' } }
}

export const TextoDeclarations: LibDeclaration = {
  ...ListaDeclarations,

  letra_na: {
    ref: 'charAt',
    tipo: {
      params: [['posicao', 'numero']],
      retorno: 'texto' } },

  unicode_da_letra_na: {
    ref: 'charCodeAt',
    tipo: {
      params: [['posicao', 'numero']],
      retorno: 'numero' } },

  concatenar: {
    ref: 'concat',
    tipo: {
      params: [['textos', 'lista']],
      retorno: 'texto' } },

  termina: {
    ref: 'endsWith',
    tipo: {
      params: [['com', 'texto']],
      retorno: 'booleano' } },

  possui: {
    ref: 'includes',
    tipo: {
      params: [['texto', 'texto']],
      retorno: 'booleano' } },

  indice: {
    ref: 'indexOf',
    tipo: {
      params: [['texto', 'texto']],
      retorno: 'numero' } },

  ultimo_indice: {
    ref: 'lastIndexOf',
    tipo: {
      params: [['texto', 'texto']],
      retorno: 'numero' } },

  // casa_com: {},

  normalizar: {
    ref: 'normalize',
    tipo: {
      params: [],
      retorno: 'texto' } },

  substituir: {
    ref: 'replace',
    tipo: {
      params: [['texto', 'texto'], ['pelo_texto', 'texto']],
      retorno: 'texto' } },

  pesquisar_por: {
    ref: 'search',
    tipo: {
      params: [['texto', 'texto']],
      retorno: 'numero' } },

  // pesquisar_por: {},

  obter_subtexto: {
    ref: 'substring',
    tipo: {
      params: [['posicao_inicial', 'numero'], ['posicao_final', 'numero']],
      retorno: 'texto' } },

  dividir_texto_pelo: {
    ref: 'split',
    tipo: {
      params: [['separador', 'texto']],
      retorno: 'lista' } },

  inicia: {
    ref: 'startsWith',
    tipo: {
      params: [['com', 'texto']],
      retorno: 'booleano' } },

  minusculo: {
    ref: 'toLowerCase',
    tipo: {
      params: [],
      retorno: 'texto' } },

  maiusculo: {
    ref: 'toUpperCase',
    tipo: {
      params: [],
      retorno: 'texto' } },

  remover_espacos_das_laterais: {
    ref: 'trim',
    tipo: {
      params: [],
      retorno: 'texto' } },

  remover_espacos_a_esquerda: {
    ref: 'trimLeft',
    tipo: {
      params: [],
      retorno: 'texto' } },

  remover_espacos_a_direita: {
    ref: 'trimRight',
    tipo: {
      params: [],
      retorno: 'texto' } }

}
