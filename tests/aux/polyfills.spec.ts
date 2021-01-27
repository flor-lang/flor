import { generatorTester, assignRhs } from "../utils"
import { Program } from "../../src/parsers/program"
import { Expression } from "../../src/parsers/expressions"

test('test conditional expression polyfill', (): void => {
  generatorTester(Expression)(
    [
      ['se verdadeiro entao 1 senao 0', '__cdt_expr__(null,true,1,0)\n__exports__({});'],
      ['se nulo entao 1 senao 0', '__cdt_expr__(null,null,1,0)\n__exports__({});'],
      ['se 5 > 0 entao 1', '__cdt_expr__(null,5>0,1,)\n__exports__({});'],
      ['se 0 > 0 entao "hey"', '__cdt_expr__(null,0>0,"hey",)\n__exports__({});'],
    ], 
    'const __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;\n' +
    'const __exports__=o=>{module&&(module.exports=o)};\n'
  )
})

test('test expression wrapper polyfill', (): void => {
  generatorTester(Program)(
    [
      ['foo = 5 + setentrional', 'let foo = __expr__(5+setentrional);\n__exports__({foo});'],
      ['tru = foo * bar', 'let tru = __expr__(foo*bar);\n__exports__({foo,tru});'],
      ['bar = cinco igual a 4', 'let bar = __expr__(cinco==4);\n__exports__({foo,tru,bar});'],
      ['msg ="druida louco"', 'let msg = __expr__("druida louco");\n__exports__({foo,tru,bar,msg});'],
    ], 
    'const __nullish_coalesce__=(l,_=null)=>null==l?_:l;\n' + 
    'const __expr__=_=>__nullish_coalesce__(_);\n' +
    'const __exports__=o=>{module&&(module.exports=o)};\n'
  )
})

test('test expression and condional expression polyfills', (): void => {
  generatorTester(Program)(
    [
      ['foo = se verdadeiro entao 1 senao 0', 'foo = __expr__(__cdt_expr__(foo,true,1,0));\n__exports__({foo,tru,bar,msg});'],
      ['tru = se nulo entao 1 senao 0', 'tru = __expr__(__cdt_expr__(tru,null,1,0));\n__exports__({foo,tru,bar,msg});'],
      ['bar = se 5 > 0 entao 1', 'bar = __expr__(__cdt_expr__(bar,5>0,1,));\n__exports__({foo,tru,bar,msg});'],
      ['msg = se 0 > 0 entao "hey"', 'msg = __expr__(__cdt_expr__(msg,0>0,"hey",));\n__exports__({foo,tru,bar,msg});'],
    ],
    'const __nullish_coalesce__=(l,_=null)=>null==l?_:l;\n' + 
    'const __expr__=_=>__nullish_coalesce__(_);\n' +
    'const __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;\n' +
    'const __exports__=o=>{module&&(module.exports=o)};\n'
  )
})

test('test expression wrapper polyfill in class property declaration', (): void => {
  generatorTester(Program)(
    [
      [
        'definir classe Foo propriedades: bar = "bar" fim',
        `class Foo{\nstatic __propertiesDeclarations__() {if (this) {this.bar = ${assignRhs('"bar"').slice(0, -1)}}\n}` +
        `constructor(){\nFoo.__propertiesDeclarations__.bind(this)()\n}}\nFoo.__propertiesDeclarations__.bind(null)()\n` +
        `\n__exports__({foo,tru,bar,msg,Foo});`
      ],
    ],
    'const __nullish_coalesce__=(l,_=null)=>null==l?_:l;\n' + 
    'const __expr__=_=>__nullish_coalesce__(_);\n' +
    'const __exports__=o=>{module&&(module.exports=o)};\n'
  )
})
