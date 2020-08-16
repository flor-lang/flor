/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
declare namespace NodeJS {
  interface Global {

    Texto: {
      do_unicode: (...codigos: number[]) => string;
    };

    Numero: {
      EPSILON: number;
      VALOR_MAX: number;
      VALOR_MIN: number;
      INFINITO_POSITIVO: number;
      INFINITO_NEGATIVO: number;
      NaN: number;
      e_finito: (numero: number) => boolean;
      e_inteiro: (numero: number) => boolean;
      e_NaN: (numero: number) => boolean;
    };

    Lista: {
      e_lista: <T>(lista: T[]) => boolean;
    };

    Matematica: Math;

    txt: <T>(arg: T) => string;
    bool: <T>(arg: T) => boolean;
    list: (arg: Iterable<unknown>) => unknown[];
    dic: (arg: string) => {};
    num: <T>(arg: T) => number;
    int: (arg: string) => number;
    real: (arg: string) => number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    escrever: (messagem: any) => void;
  }
}

declare interface String {
  letra_na: (posicao: number) => string;
  unicode_da_letra_na: (indice: number) => number;
  concatenar: (...textos: string[]) => string;
  termina_com: (texto: string) => boolean;
  possui: (texto: string) => boolean;
  indice: (texto: string) => number;
  ultimo_indice: (texto: string) => number;
  normalizar: () => string;
  substituir: (texto: string, por_texto: string) => string;
  pesquisar_por: (texto: string) => number;
  obter_subtexto: (inicio: number, fim: number) => string;
  dividir_texto_por: (separador: string) => string[];
  inicia_com: (texto: string) => boolean;
  minusculo: () => string;
  maiusculo: () => string;
  remover_espacos_das_laterais: () => string;
  remover_espacos_a_esquerda: () => string;
  remover_espacos_a_direita: () => string;
  tamanho: () => number;
}

declare interface Number {
  com_n_casas_decimais: (n: number) => string;
  notacao_cientifica: () => string;
}

declare interface Array<T> {
  concatenar: <T>(...items: T[]) => T[];
  verificar_todo_elemento: <T>(fn: (valor: T, indice: number) => unknown) => boolean;
  preencher_com: <T>(valor: T, inicio: number, fim: number) => T[];
  filtrar: <T>(fn: (valor: T, indice: number) => boolean) => T[];
  encontrar: <T>(fn: (valor: T, indice: number) => boolean) => T;
  encontrarIndice: <T>(fn: (valor: T, indice: number) => boolean) => number;
  para_cada: <T>(fn: (valor: T, indice: number) => void) => void;
  possui: <T>(valor: T) => boolean;
  indice: <T>(valor: T) => number;
  unir_em_texto: <T>(separador: string) => string;
  ultimo_indice: <T>(valor: T) => number;
  mapear: <T, U>(fn: (valor: T, indice: number) => U) => U[];
  remover_ultimo_elemento: <T>() => T;
  adicionar: <T>(...valores: T[]) => number;
  reduzir: <T, U>(fn: (valor_anterior: U, valor_atual: T, index: number) => U, valor_inicial: U) => U;
  inverter: <T>() => T[];
  remover_primeiro_elemento: <T>() => T;
  obter_sublista: <T>(inicio: number, fim: number) => T[];
  verificar_algum_elemento: <T>(fn: (valor: T, indice: number) => unknown) => boolean;
  ordenar: <T>(fn: (a: T, b: T) => number) => T[];
  remover_elementos: <T>(inicio: number, quantidade: number) => T[];
  adicionar_no_inicio: <T>(...valores: T[]) => number;

  __old_array_to_string__: () => string;
  inserir: <T>(valor: T, posicao: number) => void;
  remover_elemento: <T>(posicao: number) => T;
  tamanho: () => void;
}

declare interface Object {
  possui: (propriedade: string) => boolean;
}

declare interface Math {
  absoluto: (numero: number) => number;
  arco_cosseno: (numero: number) => number;
  arco_cosseno_hiperbolico: (numero: number) => number;
  arco_seno: (numero: number) => number;
  arco_seno_hiperbolico: (numero: number) => number;
  arco_tangente: (numero: number) => number;
  arco_tangente_2: (x: number, y: number) => number;
  arco_tangente_hiperbolico: (numero: number) => number;
  raiz_cubica: (numero: number) => number;
  teto_de: (numero: number) => number;
  cosseno: (numero: number) => number;
  cosseno_hiperbolico: (numero: number) => number;
  c_euler_el: (numero: number) => number;
  e_el: (numero: number) => number;
  chao: (numero: number) => number;
  hipotenusa: (...numeros: number[]) => number;
  log_base_10: (numero: number) => number;
  log_base_2: (numero: number) => number;
  el: (base: number, exp: number) => number;
  elevar: (base: number, exp: number) => number;
  num_aleatorio: () => number;
  arredondar: (numero: number) => number;
  sinal: (numero: number) => number;
  seno: (numero: number) => number;
  seno_hiperbolico: (numero: number) => number;
  raiz: (numero: number) => number;
  raiz_quadrada: (numero: number) => number;
  tangente: (numero: number) => number;
  tangente_hiperbolica: (numero: number) => number;
  truncar: (numero: number) => number;
}
