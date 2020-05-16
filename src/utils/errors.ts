// TODO: Handle Parsimmon and Semantics Errors
export const FlorCompilationErrorMessage = (error: Error): string => error.message

export const FlorRuntimeErrorMessage = (error: Error): string => {
  let __florErrorMessage__ = error.message

  if (error instanceof TypeError) {
    if (error.message.endsWith('is not a function')) {
      __florErrorMessage__ = error.message.replace(
        'is not a function', 'não é uma função'
      )
    }

    if (error.message.startsWith('Cannot read property') &&
        error.message.endsWith('of undefined')) {
      __florErrorMessage__ = error.message.replace(
        'Cannot read property', 'Váriavel'
      ).replace(
        'of undefined', 'não pode ser lida de um objeto não existente'
      )
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
