import SymbolTable from '../../src/enviroment/symbol-table'

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

test('test get of symbol in parent scope', () => {
  const parentSymbolTable = new SymbolTable(null)
  parentSymbolTable.put('var1', mockedNode('value1'))
  
  const symbolTable = new SymbolTable(parentSymbolTable)
  symbolTable.put('var2', mockedNode('value2'))

  expect(symbolTable.get('var2')).toMatchObject({ value: 'value2' })
  expect(symbolTable.get('var1')).toMatchObject({ value: 'value1' })
  expect(parentSymbolTable.get('var2')).toBe(null)
})

test('test different symbols access to tables with same parent', () => {
  const parentSymbolTable = new SymbolTable(null)
  parentSymbolTable.put('var1', mockedNode('value1'))
  
  const symbolTable1 = new SymbolTable(parentSymbolTable)
  symbolTable1.put('var2', mockedNode('value2'))

  const symbolTable2 = new SymbolTable(parentSymbolTable)
  symbolTable2.put('var3', mockedNode('value3'))

  expect(symbolTable1.get('var1')).toMatchObject({ value: 'value1' })
  expect(symbolTable2.get('var1')).toMatchObject({ value: 'value1' })

  expect(symbolTable1.get('var2')).toMatchObject({ value: 'value2' })
  expect(symbolTable2.get('var3')).toMatchObject({ value: 'value3' })

  expect(symbolTable1.get('var3')).toBe(null)
  expect(symbolTable2.get('var2')).toBe(null)
})
