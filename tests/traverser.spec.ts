import { traverser, AstNode } from '../src/utils/traverse'
import { getAssignmentProgramAst, getComplexProgramAst } from './utils'

test('test if visitor enter', () => {
  let flag = false
  const fakeAstNode: AstNode = getAssignmentProgramAst()
  const visitor = {
    assignment: {
      enter (node: AstNode, parent: AstNode): void { flag = true },
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

test('stop if node not have name', () => {
  let flag = false
  const fakeAstNode: AstNode = getAssignmentProgramAst()
  const visitor = {
    expression: {
      enter (node: AstNode, parent: AstNode): void { flag = true },
      exit (node: AstNode, parent: AstNode): void { flag = true }
    }
  }
  traverser(fakeAstNode, visitor)
  expect(flag).toBe(false)   
})

test('test complex ast', () => {
  let flag = false
  const fakeAstNode: AstNode = getComplexProgramAst()
  const visitor = {
    interfaceDeclaration: {
      exit (node: AstNode, parent: AstNode): void { flag = true }
    }
  }
  traverser(fakeAstNode, visitor)
  expect(flag).toBe(true)
})

test('visitor more complex', () => {
  let flagForClass = false
  let flagForInterface = false
  const fakeAstNode: AstNode = getComplexProgramAst()
  const visitor = {
    classDeclaration: {

      exit (node: AstNode, parent: AstNode): void { flagForClass = true }
    },
    interfaceDeclaration: {
      exit (node: AstNode, parent: AstNode): void { flagForInterface = true }
    }
  }
  traverser(fakeAstNode, visitor)
  expect(flagForClass).toBe(true)
  expect(flagForInterface).toBe(true)
})


test('stop if node not have name', () => {
  let flag = false
  const fakeAstNode: AstNode = getAssignmentProgramAst()
  const visitor = {
    add: {
      between (node: AstNode, parent: AstNode, index: number): void { 
        flag = true
        expect(node.name).toBe('operator')
        expect(node.value).toBe('-')
        expect(index).toBe(1)
        expect(parent.name).toBe('add')
      }
    }
  }
  traverser(fakeAstNode, visitor)
  expect(flag).toBe(true)   
})

