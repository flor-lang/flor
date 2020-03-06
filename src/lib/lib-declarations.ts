/* eslint-disable @typescript-eslint/prefer-interface */

export type LibDeclaration = {
  [key: string]: {
    ref: string;
    tipo: string
    | { params: [string, string][]; retorno: string }; }; }
