import { Loc } from '../../src/parsers/assignment'

test('test loc node mapping', () => {
  expect(Loc.tryParse('mario.matheus')).toMatchObject({
    value: [
      { value: { value: 'mario' } },
      { value: [
        { value: { value: 'matheus' } }
      ]}
    ]
  })

  expect(Loc.tryParse('mario.codar()')).toMatchObject({
    value: [
      { value: { value: 'mario' } },
      { value: [
        { value: { value: [ { value: 'codar' }, { value: [] } ] } }
      ]}
    ]
  })

  expect(Loc.tryParse('mario.f(x: 0)')).toMatchObject({
    value: [
      { value: { value: 'mario' } },
      { value: [
        { value: { value: [
          { value: 'f' },
          { value: [ { value: [ { value: 'x' }, { name: 'expression' } ] } ] }
        ] } }
      ]}
    ]
  })

  expect(Loc.tryParse('mario.codar().codigo.texto')).toMatchObject({
    value: [
      { value: { value: 'mario' } },
      { value: [
        { value: { value: [ { value: 'codar' }, { value: [] } ] } },
        { value: { value: 'codigo' } },
        { value: { value: 'texto' } }
      ]}
    ]
  })

  expect(Loc.tryParse('codigo.bonito.top().da_bola()')).toMatchObject({
    value: [
      { value: { value: 'codigo' } },
      { value: [
        { value: { value: 'bonito' } },
        { value: { value: [ { value: 'top' }, { value: [] } ] } },
        { value: { value: [ { value: 'da_bola' }, { value: [] } ] } }
      ]}
    ]
  })

  expect(Loc.tryParse('parse().tree')).toMatchObject({
    value: [
      { value: { value: [ { value: 'parse' }, { value: [] } ] } },
      { value: [
        { value: { value: 'tree' } }
      ]}
    ]
  })

  expect(Loc.tryParse('lista[0]')).toMatchObject({
    value: [
      { value: { value: 'lista' } },
      { value: [
        { value: { value: { value: 0 } } }
      ]}
    ]
  })

})
