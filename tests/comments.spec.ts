import comments from '../src/utils/comments'

test('remove single line comment', (): void => {
  expect(
    comments.remove('a = 1// teste')
  ).toBe('a = 1')
})

test('remove multi line comment', (): void => {
  // Multi line comment in one line
  expect(
    comments.remove('a = 1/* teste */')
  ).toBe('a = 1')
  // Multi line comment in more than one line
  expect(
    comments.remove('a = 1\n/*\nteste\n*/')
  ).toBe('a = 1\n')
})

test('not remove comment inside string', (): void => {
  // Single
  expect(
    comments.remove('a = "// teste"')
  ).toBe('a = "// teste"')
  // Double
  expect(
    comments.remove('a = "/* teste */"')
  ).toBe('a = "/* teste */"')
  // Escaping chars
  expect(
    comments.remove('a = "\\" // Teste"')
  ).toBe('a = "\\" // Teste"')
})