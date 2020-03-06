/* eslint-disable @typescript-eslint/prefer-interface */

type LibFunctionDeclaration = { params: [string, string | LibFunctionDeclaration][]; retorno: string }

export type LibDeclaration = {
  [key: string]: {
    ref: string;
    tipo: string | LibFunctionDeclaration; }; }
