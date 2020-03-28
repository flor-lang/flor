import { traverser, AstNode } from '../src/utils/traverse'
import { getAssignmentProgramAst, getComplexProgramAst } from './utils'

test('test if visitor enter', () => {
  let flag = false
  const fakeAstNode: AstNode = getAssignmentProgramAst()
  const visitor = {
    assignment: {
      enter (node: AstNode, parent: AstNode): void { flag = true },
      exit (node: AstNode, parent: AstNode): void { /* não faz nada */ }
    }
  }
  traverser(fakeAstNode, visitor)
  expect(flag).toBe(true)   
})

test('test if can exit', () => {
  let flag = false
  const fakeAstNode: AstNode = getAssignmentProgramAst()
  const visitor = {
    assignment: {
      enter (node: AstNode, parent: AstNode): void { /* não faz nada */ },
      exit (node: AstNode, parent: AstNode): void { flag = true }
    }
  }
  traverser(fakeAstNode, visitor)
  expect(flag).toBe(true)   
})

test('test visitor order, enter first, exit after', () => {
  let counter = 0
  const fakeAstNode: AstNode = getAssignmentProgramAst()
  const visitor = {
    assignment: {
      enter (node: AstNode, parent: AstNode): void {
        counter++
        expect(counter).toBe(1)
      },
      exit (node: AstNode, parent: AstNode): void {
        counter++
        expect(counter).toBe(2)  
      }
    }
  }
  traverser(fakeAstNode, visitor)
})

test('test comples ast', () => {
  let flag = false
  const fakeAstNode: AstNode = getComplexProgramAst()
  const visitor = {
    'interface-declaration': {
      enter (node: AstNode, parent: AstNode): void { /* não faz nada */ },
      exit (node: AstNode, parent: AstNode): void { flag = true }
    }
  }
  traverser(fakeAstNode, visitor)
  expect(flag).toBe(true)
})
