import { Loc } from '../src/parsers/assignment'

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
        { value: { value: { identifier: { value: 'codar' } } } }
      ]}
    ]
  })

  expect(Loc.tryParse('mario.codar().codigo.texto')).toMatchObject({
    value: [
      { value: { value: 'mario' } },
      { value: [
        { value: { value: { identifier: { value: 'codar' } } } },
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
        { value: { value: { identifier: { value: 'top' } } } },
        { value: { value: { identifier: { value: 'da_bola' } } } }
      ]}
    ]
  })

  expect(Loc.tryParse('parse().tree')).toMatchObject({
    value: [
      { value: { value: { identifier: { value: 'parse' } } } },
      { value: [
        { value: { value: 'tree' } }
      ]}
    ]
  })

  expect(Loc.tryParse('lista[0]')).toMatchObject({
    value: [
      { value: { value: 'lista' } },
      { value: [
        { value: { value: 0 } }
      ]}
    ]
  })

})
