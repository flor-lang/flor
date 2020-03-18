/* eslint-disable no-unused-expressions */
/* Basic Types */

// Texto : String
'string'.charAt(0)
'string'.charCodeAt(0)
'string'.concat(['hei', 'listen']) // array property
'string'.endsWith('sufixo')
'string'.includes('palavra') // array property
'string'.indexOf('texto') // array property
'string'.lastIndexOf('texto') // array property
'string'.length // array property
'string'.match(new RegExp('[0-9]*')) // regex lib
'string'.normalize()
'string'.replace('valor', 'novo valor')
'string'.search('valor' || new RegExp('valor'))

'string'.substring(0, 10) || 'string'.slice(0, 10) // array property
'string'.split('-')
'string'.startsWith('prefixo')
'string'.toLowerCase()
'string'.toUpperCase()
'string'.trim()
'string'.trimLeft()
'string'.trimRight()

// Numero : Number
0.5.toExponential()
0.5.toFixed()

// Booleano : Boolean

// Lista : Array
const lista = []
lista.concat([])
lista.every(valor => valor % 2 === 0)
lista.fill(0, 1, 5)
lista.filter((valor) => valor % 2 === 0)
lista.find((valor) => valor - 5 > 10)
lista.findIndex((valor) => valor - 5 > 10)
lista.forEach((valor) => console.log(valor))
lista.includes(5)
lista.indexOf(0)
lista.join('-')
lista.lastIndexOf(0)
lista.length
lista.map((valor) => valor * 2)
lista.pop()
lista.push(0)
lista.reduce((anterior, atual) => anterior + atual, 0)
lista.reverse()
lista.shift()
lista.slice(0, 2)
lista.some(valor => valor % 2 === 0)
lista.sort((a, b) => a > b)
lista.splice(5, 1)
lista.splice(2, 0, 10)
lista.unshift(0)

// Dictionary : Object

// Object : Object
