import { generatorTester } from "../utils"
import { Program } from "../../src/parsers/program"
import { Expression } from "../../src/parsers/expressions"

test('test conditional expression polyfill', (): void => {
  generatorTester(Expression)(
    [
      ['se verdadeiro entao 1 senao 0', '__cdt_expr__(null,true,1,0)'],
      ['se nulo entao 1 senao 0', '__cdt_expr__(null,null,1,0)'],
      ['se 5 > 0 entao 1', '__cdt_expr__(null,5>0,1,)'],
      ['se 0 > 0 entao "hey"', '__cdt_expr__(null,0>0,"hey",)'],
    ], 
    'const __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;\n'
  )
})

test('test expression wrapper polyfill', (): void => {
  generatorTester(Program)(
    [
      ['foo = 5 + setentrional', 'let foo = __expr__(5+setentrional);'],
      ['tru = foo * bar', 'let tru = __expr__(foo*bar);'],
      ['bar = cinco igual a 4', 'let bar = __expr__(cinco==4);'],
      ['msg ="druida louco"', 'let msg = __expr__("druida louco");'],
    ], 
    'const __nullish_coalesce__=(l,_=null)=>null==l?_:l;\n' + 
    'const expr=_=>__nullish_coalesce__(_);\n'
  )
})

test('test expression and condional expression polyfills', (): void => {
  generatorTester(Program)(
    [
      ['foo = se verdadeiro entao 1 senao 0', 'foo = __expr__(__cdt_expr__(foo,true,1,0));'],
      ['tru = se nulo entao 1 senao 0', 'tru = __expr__(__cdt_expr__(tru,null,1,0));'],
      ['bar = se 5 > 0 entao 1', 'bar = __expr__(__cdt_expr__(bar,5>0,1,));'],
      ['msg = se 0 > 0 entao "hey"', 'msg = __expr__(__cdt_expr__(msg,0>0,"hey",));'],
    ],
    'const __nullish_coalesce__=(l,_=null)=>null==l?_:l;\n' + 
    'const expr=_=>__nullish_coalesce__(_);\n' +
    'const __cdt_expr__=(_,c,l,n)=>n?c?l:n:c?l:_||null;\n'
  )
})
