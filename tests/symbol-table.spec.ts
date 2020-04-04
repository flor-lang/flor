import SymbolTable from '../src/enviroment/symbol-table'

const mockedIndex = { column: 0, line: 0, offset: 0 }
const mockedPositions = { start: mockedIndex, end: mockedIndex }
const mockedNode = (value: any) => ({ name: 'mock', value: value, ...mockedPositions })

test('test simple declarations in program node', () => {
  const symbolTable = new SymbolTable(null)
  symbolTable.put('var1', mockedNode('value1'))
  symbolTable.put('var2', mockedNode('value2'))
  symbolTable.put('var3', mockedNode('value3'))
  
  expect(symbolTable.get('var1')).toMatchObject({ value: 'value1' })
  expect(symbolTable.get('var2')).toMatchObject({ value: 'value2' })
  expect(symbolTable.get('var3')).toMatchObject({ value: 'value3' })
})


test('test simple redeclaration in program node', () => {
  const symbolTable = new SymbolTable(null)
  symbolTable.put('var1', mockedNode('value1'))
  symbolTable.put('var2', mockedNode('value2'))
  symbolTable.put('var1', mockedNode('value3'))

  expect(symbolTable.get('var1')).toMatchObject({ value: 'value3' })
  expect(symbolTable.get('var2')).toMatchObject({ value: 'value2' })
})

