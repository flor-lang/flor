import { Loc } from '../src/parsers/assignment'

test('test loc node mapping', () => {
    expect(Loc.tryParse('mario.matheus')).toMatchObject({
      value: {
        subscriptable: { value: { value: 'mario' } },
        params: [
          { value: { value: 'matheus' } }
        ]
      }
    })

    expect(Loc.tryParse('mario.codar()')).toMatchObject({
      value: {
        subscriptable: { value: { value: 'mario' } },
        params: [
          { value: { value: { identifier: { value: 'codar' } } } }
        ]
      }
    })

    expect(Loc.tryParse('mario.codar().codigo.texto')).toMatchObject({
      value: {
        subscriptable: { value: { value: 'mario' } },
        params: [
          { value: { value: { identifier: { value: 'codar' } } } },
          { value: { value: 'codigo' } },
          { value: { value: 'texto' } }
        ]
      }
    })

    expect(Loc.tryParse('codigo.bonito.top().da_bola()')).toMatchObject({
      value: {
        subscriptable: { value: { value: 'codigo' } },
        params: [
          { value: { value: 'bonito' } },
          { value: { value: { identifier: { value: 'top' } } } },
          { value: { value: { identifier: { value: 'da_bola' } } } }
        ]
      }
    })

    expect(Loc.tryParse('parse().tree')).toMatchObject({
      value: {
        subscriptable: { value: { value: { identifier: { value: 'parse' } } } },
        params: [
          { value: { value: 'tree' } }
        ]
      }
    })

})
