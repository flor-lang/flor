import { sum } from '../src/main'

test('basic', (): void => {
  expect(sum()).toBe(0)
})

test('basic again', (): void => {
  expect(sum(1, 2)).toBe(3)
})

test('basic over and over again', (): void => {
  expect(sum(-1, 1)).toBe(0)
})
