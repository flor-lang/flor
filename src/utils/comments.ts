const SLASH = '/'
const BACK_SLASH = '\\'
const STAR = '*'
const DOUBLE_QUOTE = '"'
const NEW_LINE = '\n'
const CARRIAGE_RETURN = '\r'

const remove = (file: string): string => {
  const original = file.split('')
  let position = 0
  const output: string[] = []

  const getCurrentChar = (): string => original[position]
  const getPreviousChar = (): string => original[position - 1]
  const getNextChar = (): string => original[position + 1]
  const addNewLine = (): void => { output.push(NEW_LINE) }
  const add = (): void => { output.push(getCurrentChar()) }
  const next = (): void => { position++ }
  const atEnd = (): boolean => position >= original.length
  const isEscaping = (): boolean => {
    if (getPreviousChar() === BACK_SLASH) {
      let offset = 1
      let escaped = true
      while ((position - offset) > 0) {
        escaped = !escaped
        const current = position - offset
        if (original[current] !== BACK_SLASH) return escaped
        offset++
      }
    }
    return false
  }

  const processDoubleQuotedString = (): string => {
    if (getCurrentChar() === DOUBLE_QUOTE) {
      add()
      next()
      while (!atEnd()) {
        if (getCurrentChar() === DOUBLE_QUOTE && !isEscaping()) return
        add()
        next()
      }
    }
  }

  const processSingleLineComment = (): void => {
    if (getCurrentChar() === SLASH && getNextChar() === SLASH) {
      next()
      while (!atEnd()) {
        next()
        if (getCurrentChar() === NEW_LINE || getCurrentChar() === CARRIAGE_RETURN) {
          return
        }
      }
    }
  }

  const processMultiLineComment = (): void => {
    if (getCurrentChar() === SLASH && getNextChar() === STAR) {
      next()
      while (!atEnd()) {
        next()
        if (getCurrentChar() === NEW_LINE) {
          addNewLine()
        }
        if (getCurrentChar() === STAR && getNextChar() === SLASH) {
          next()
          next()
          return
        }
      }
    }
  }

  const processRegex = (): void => {
    if (getCurrentChar() === SLASH && getNextChar() !== SLASH && getNextChar() !== STAR) {
      while (!atEnd()) {
        add()
        next()
        if (getCurrentChar() === SLASH && !isEscaping()) return
      }
    }
  }

  while (!atEnd()) {
    processRegex()
    processDoubleQuotedString()
    processSingleLineComment()
    processMultiLineComment()
    if (!atEnd()) {
      add()
      next()
    }
  }
  return output.join('')
}

export default {
  remove
}
