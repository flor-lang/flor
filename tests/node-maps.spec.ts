import { Loc } from '../src/parsers/assignment'

test('test loc node mapping', () => {
  expect(Loc.tryParse('mario.matheus')).toMatchObject({
    subscriptable: { value: { value: 'mario' } },
    params: [
      { value: { value: 'matheus' } }
    ]
  })

  expect(Loc.tryParse('mario.codar()')).toMatchObject({
    subscriptable: { value: { value: 'mario' } },
    params: [
      { value: { value: { identifier: { value: 'codar' } } } }
    ]
  })

  expect(Loc.tryParse('mario.codar().codigo.texto')).toMatchObject({
    subscriptable: { value: { value: 'mario' } },
    params: [
      { value: { value: { identifier: { value: 'codar' } } } },
      { value: { value: 'codigo' } },
      { value: { value: 'texto' } }
    ]
  })

  expect(Loc.tryParse('codigo.bonito.top().da_bola()')).toMatchObject({
    subscriptable: { value: { value: 'codigo' } },
    params: [
      { value: { value: 'bonito' } },
      { value: { value: { identifier: { value: 'top' } } } },
      { value: { value: { identifier: { value: 'da_bola' } } } }
    ]
  })

  expect(Loc.tryParse('parse().tree')).toMatchObject({
    subscriptable: { value: { value: { identifier: { value: 'parse' } } } },
    params: [
      { value: { value: 'tree' } }
    ]
  })

  expect(Loc.tryParse('lista[0]')).toMatchObject({
    subscriptable: { value: { value: 'lista' } },
    params: [
      { value: { value: 0 } }
    ]
  })

})
