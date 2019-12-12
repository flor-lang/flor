const SLASH = '/'
// const BACK_SLASH = '\\'
// const STAR = '*'
// const DOUBLE_QUOTE = '"'
// const SINGLE_QUOTE = "'"
const NEW_LINE = '\n'
const CARRIAGE_RETURN = '\r'

const remove = (file: string): string => {
  const original = file.split('')
  let position = 0
  const output: string[] = []

  const getCurrentChar = (): string => original[position]
  // const getPreviusChar = (): string => original[position - 1]
  const getNextChar = (): string => original[position + 1]
  const add = (): void => { output.push(getCurrentChar()) }
  const next = (): void => { position++ }
  const atEnd = (): boolean => position >= original.length

  const processSingleLineComment = (): void => {
    if (getCurrentChar() === SLASH) {
      if (getNextChar() === SLASH) {
        next()
        while (!atEnd()) {
          next()
          if (getCurrentChar() === NEW_LINE || getCurrentChar() === CARRIAGE_RETURN) {
            return
          }
        }
      }
    }
  }

  while (!atEnd()) {
    processSingleLineComment()
    if (!atEnd()) {
      add()
      next()
    }
  }
  console.log(original, output)
  return output.join('')
}

export default {
  remove
}
