import { Factor, Unary, Term, Add, Rel, Equality, Join, Bool } from '../src/parsers/expression'
import { canParse, cantParse } from './utils'


test('parse factor', (): void => {
  const canParseFactor = canParse(Factor)
  const cantParseFactor = cantParse(Factor)

  canParseFactor(['5', '(5)', '(-5 * 8)'])
  cantParseFactor(['"5"', '5 - 1', '9 + - 3', '5 -1'])

  expect(Factor.parse('5')).toMatchObject({
    status: true,
    value: {
      name: 'factor',
      value: { name: 'number', value: 5 }
    }
  })
})

test('parse unary', (): void => {
  const canParseUnary = canParse(Unary)
  const cantParseUnary = cantParse(Unary)

  canParseUnary(['5', '-5', '+5', '-(-5)'])
  cantParseUnary(['- 5', '-+5', '*5', ''])

  expect(Unary.parse('-5')).toMatchObject({
    status: true,
    value: {
      name: 'unary',
      value: { unaryline: '-', factor: {
        name: 'factor', value: { name: 'number', value: 5 }
      }}
    }
  })
})

test('parse term', (): void => {
  const canParseTerm = canParse(Term)
  const cantParseTerm = cantParse(Term)

  canParseTerm(['5*10', '-5*0', '1/5', '2 / (-5)', '2 * -1', '2 % 2', '1 * 1 * 1'])
  cantParseTerm(['1/2/', '2+1', '2 - 1', '*5', '%1'])

  expect(Term.parse('2 * 5')).toMatchObject({
    status: true,
    value: {
      name: 'term',
      value: { 
        unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 2 } } } }, 
        termline: { 
          operator: '*', 
          unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 5 } } } } } 
      }
    }
  })
})

test('parse add', (): void => {
  const canParseAdd = canParse(Add)
  const cantParseAdd = cantParse(Add)

  canParseAdd(['5+10', '-5+0', '1-5', '2/(2-5)', '2 - -1', '5', '2 + 2 + 2'])
  cantParseAdd(['1+2-', '2-*5'])

  expect(Add.parse('2 * 5')).toMatchObject({
    status: true,
    value: {
      name: 'add',
      value: {
        addline: '',
        term: { 
          name: 'term',
          value: {
            unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 2 } } } }, 
            termline: {
              operator: '*', 
              unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 5 } } } } } 
            }
        }
      }
    }
  })
})

test('can parse relation operation', (): void => {
  const canParseRel = canParse(Rel)
  const cantParseRel = cantParse(Rel)

  canParseRel(['5>2', '2 < 1', '5>=5', '2<=2', '5 >= (5+2)', '(1*1) <= (1/1)'])
  cantParseRel(['5>>2', '2=2', '3==3', '', '>', '<3<3', '5 < 4 < 3', '(1<=1)>(2>=1)'])

  expect(Rel.parse('2>=3')).toMatchObject({
    status: true,
    value: {
      name: 'rel',
      value: {
        operator: '>=',
        lhs: {
          name: 'add',
          value: {
            addline: '',
            term: {
              name: 'term',
              value: {
                unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 2 } } } }, 
                termline: ''
              }
            }
          }
        },
        rhs: {
          name: 'add',
          value: {
            addline: '',
            term: { 
              name: 'term',
              value: {
                unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 3 } } } }, 
                termline: ''
              }
            }
          }
        }
      }
    }
  })
})

test('can parse equality operation', (): void => {
  const canParseEquality = canParse(Equality)
  const cantParseEquality = cantParse(Equality)

  canParseEquality(['1==1', '2!=-1', '-10 == 0', '8 != -(87+1)', '1 == 1 == 1'])
  cantParseEquality(['1 !== 1', '20 === 1', '!=1', ''])

  expect(Equality.parse('1 != 1')).toMatchObject({
    status: true,
    value: {
      name: 'equality',
      value: {
        rel: {
          name: 'rel',
          value: {
            name: 'add',
            value: {
              term: {
                name: 'term',
                value: {
                  unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 1 } } } }, 
                  termline: ''
                }
              }
            }
          }
        },
        equalityline: {
          operator: '!=',
          rel: {
            name: 'rel',
            value: {
              name: 'add',
              value: {
                term: {
                  name: 'term',
                  value: {
                    unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 1 } } } }, 
                    termline: ''
                  }
                }
              }
            }
          }
        }
      }
    }
  })
})

test('can parse join operation', (): void => {
  const canParseJoin = canParse(Join)
  const cantParseJoin = cantParse(Join)

  canParseJoin(['2 e 2', '1 e 5', '10 e 0 e 8'])
  cantParseJoin(['1e', 'e1', '', 'e 1'])

  expect(Join.parse('1 e 1')).toMatchObject({
    status: true,
    value: {
      name: 'join',
      value: {
        equality: {
          name: 'equality',
          value: {
            equalityline: '',
            rel: {
              name: 'rel',
              value: {
                name: 'add',
                value: {
                  addline: '',
                  term: {
                    name: 'term',
                    value: {
                      unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 1 } } } }, 
                      termline: '' 
                    }
                  }
                }
              }
            }
          }
        },
        joinline: {
          joinline: '',
          equality: {
            name: 'equality',
            value: {
              equalityline: '',
              rel: {
                name: 'rel',
                value: {
                  name: 'add',
                  value: {
                    addline: '',
                    term: {
                      name: 'term',
                      value: {
                        unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 1 } } } }, 
                        termline: '' 
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
})

test('can parse bool operation', (): void => {
  const canParseBool = canParse(Bool)
  const cantParseBool = cantParse(Bool)

  canParseBool(['2 ou 2', '1 ou 5', '10 e 0 ou 8'])
  cantParseBool(['1ou', 'ou1', '', 'ou 1'])

  expect(Bool.parse('1 ou 1')).toMatchObject({
    status: true,
    value: {
      name: 'bool',
      value: {
        join: {
          name: 'join',
          value: {
            equality: {
              name: 'equality',
              value: {
                equalityline: '',
                rel: {
                  name: 'rel',
                  value: {
                    name: 'add',
                    value: {
                      addline: '',
                      term: {
                        name: 'term',
                        value: {
                          unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 1 } } } }, 
                          termline: '' 
                        }
                      }
                    }
                  }
                }
              }
            },
          }
        },
        booline: {
          join: {
            name: 'join',
            value: {
              equality: {
                name: 'equality',
                value: {
                  equalityline: '',
                  rel: {
                    name: 'rel',
                    value: {
                      name: 'add',
                      value: {
                        addline: '',
                        term: {
                          name: 'term',
                          value: {
                            unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 1 } } } }, 
                            termline: '' 
                          }
                        }
                      }
                    }
                  }
                }
              },
            }
          },
          booline: ''
        }
      }
    }
  })
})
