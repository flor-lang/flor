// TODO: Handle Parsimmon and Semantics Errors
export const FlorCompilationErrorMessage = (error: Error): string => error.message

export const FlorRuntimeErrorMessage = (error: Error): string => {
  let florErrorMessage = error.message

  if (error instanceof TypeError) {
    if (error.message.endsWith('is not a function')) {
      florErrorMessage = error.message.replace(
        'is not a function', 'não é uma função'
      )
    }

    if (error.message.startsWith('Cannot read property') &&
        error.message.endsWith('of undefined')) {
      florErrorMessage = error.message.replace(
        'Cannot read property', 'Váriavel'
      ).replace(
        'of undefined', 'não pode ser lida de um objeto não existente'
      )
    }
  }

  return florErrorMessage
}
