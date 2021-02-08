// TODO: Handle Parsimmon and Semantics Errors
export const FlorCompilationErrorMessage = (error: Error): string => error
  .message
  .replace('PARSING FAILED', 'ERRO DE SINTAXE')
  .replace('Expected', 'Tokens Esperados')
  .replace('one of the following', '')
  .replace('Got the end of the input', 'Final do arquivo alcançado')
  .replace('/#?[_]*([a-zA-Z_][a-zA-Z0-9]+|[a-zA-Z])+/', '<variavel>')
  .replace('/[0-9]+(\\.[0-9]+)?/, /^"(?:[^\\\\"]|\\\\.)*"/', '<numero>')
  .replace('/verdadeiro|falso/', '<booleano>')
  .replace('EOF', '<Fim do Arquivo>')
