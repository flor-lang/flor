import { assignRhs, generatorTester } from "../utils"
import { Program } from "../../src/parsers/program"
import { Expression } from "../../src/parsers/expressions"
import { Polyfill } from "../../src/enviroment/polyfill"

test('test conditional expression polyfill', (): void => {
  generatorTester(Expression)(
    [
      ['se verdadeiro entao 1 senao 0', '__pf__.cdt_expr(null,true,1,0)\n__pf__.exports({});'],
      ['se nulo entao 1 senao 0', '__pf__.cdt_expr(null,null,1,0)\n__pf__.exports({});'],
      ['se 5 > 0 entao 1', '__pf__.cdt_expr(null,5>0,1,)\n__pf__.exports({});'],
      ['se 0 > 0 entao "hey"', '__pf__.cdt_expr(null,0>0,"hey",)\n__pf__.exports({});'],
    ],
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.CTD_EXPR},\n`
  )
})

test('test expression wrapper polyfill', (): void => {
  generatorTester(Program)(
    [
      ['bar = cinco igual a 4', 'let bar = __pf__.expr(cinco==4);\n__pf__.exports({bar});'],
      ['msg ="druida louco"', 'let msg = __pf__.expr("druida louco");\n__pf__.exports({bar,msg});'],
    ], 
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.EXPR},\n` +
    `${Polyfill.NULL_CLSC},\n`
  )
})

test('test sum expression polyfill', (): void => {
  generatorTester(Program)(
    [
      ['foo = 5 + setentrional', 'let foo = __pf__.expr(__pf__.add(5,\'+\',setentrional));\n__pf__.exports({bar,msg,foo});'],
      ['tru = foo + bar', 'let tru = __pf__.expr(__pf__.add(foo,\'+\',bar));\n__pf__.exports({bar,msg,foo,tru});'],
      ['bar = cinco - 4', 'bar = __pf__.expr(__pf__.add(cinco,\'-\',4));\n__pf__.exports({bar,msg,foo,tru});'],
    ], 
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.ADD},\n` +
    `${Polyfill.VLD_NULL},\n` +
    `${Polyfill.DSC_O},\n` +
    `${Polyfill.VLD_NUM_OP},\n` +
    `${Polyfill.EXPR},\n` +
    `${Polyfill.NULL_CLSC},\n`
  )
})

test('test term expression polyfill', (): void => {
  generatorTester(Program)(
    [
      ['foo = 5 * setentrional', 'foo = __pf__.expr(__pf__.term(5,\'*\',setentrional));\n__pf__.exports({bar,msg,foo,tru});'],
      ['tru = foo * bar', 'tru = __pf__.expr(__pf__.term(foo,\'*\',bar));\n__pf__.exports({bar,msg,foo,tru});'],
      ['bar = cinco / 4', 'bar = __pf__.expr(__pf__.term(cinco,\'/\',4));\n__pf__.exports({bar,msg,foo,tru});'],
    ], 
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.TERM},\n` +
    `${Polyfill.VLD_NULL},\n` +
    `${Polyfill.VLD_NUM_OP},\n` +
    `${Polyfill.EXPR},\n` +
    `${Polyfill.NULL_CLSC},\n`
  )
})

test('test expression and condional expression polyfills', (): void => {
  generatorTester(Program)(
    [
      ['foo = se verdadeiro entao 1 senao 0', 'foo = __pf__.expr(__pf__.cdt_expr(foo,true,1,0));\n__pf__.exports({bar,msg,foo,tru});'],
      ['tru = se nulo entao 1 senao 0', 'tru = __pf__.expr(__pf__.cdt_expr(tru,null,1,0));\n__pf__.exports({bar,msg,foo,tru});'],
      ['bar = se 5 > 0 entao 1', 'bar = __pf__.expr(__pf__.cdt_expr(bar,5>0,1,));\n__pf__.exports({bar,msg,foo,tru});'],
      ['msg = se 0 > 0 entao "hey"', 'msg = __pf__.expr(__pf__.cdt_expr(msg,0>0,"hey",));\n__pf__.exports({bar,msg,foo,tru});'],
    ],
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.CTD_EXPR},\n` +
    `${Polyfill.EXPR},\n` +
    `${Polyfill.NULL_CLSC},\n`
  )
})

test('test expression wrapper polyfill in class property declaration', (): void => {
  generatorTester(Program)(
    [
      [
        'definir classe Foo propriedades: bar = "bar" fim',
        `class Foo{\nstatic __propertiesDeclarations__() {if (this && this.bar === undefined) {this.bar = ${assignRhs('"bar"').slice(0, -1)}}\n}` +
        `constructor(){\nFoo.__propertiesDeclarations__.bind(this)()\n}}\nFoo.__propertiesDeclarations__.bind(null)()\nFoo.__attr__ = ['bar']\n` +
        `\n__pf__.exports({bar,msg,foo,tru,Foo});`
      ],
    ],
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.EXPR},\n` +
    `${Polyfill.NULL_CLSC},\n`
  )
})

test('test import polyfill', (): void => {
  generatorTester(Program)(
    [
      [
        'arquivo = importar "arquivo"',
        'let arquivo = __pf__.expr(require("./arquivo"));\n__pf__.exports({bar,msg,foo,tru,Foo,arquivo});'
      ],
      [
        'arquivo = importar "diretorio/arquivo"',
        'arquivo = __pf__.expr(require("./diretorio/arquivo"));\n__pf__.exports({bar,msg,foo,tru,Foo,arquivo});'
      ],
      [
        'arquivo = importar "../arquivo"',
        'arquivo = __pf__.expr(require("./../arquivo"));\n__pf__.exports({bar,msg,foo,tru,Foo,arquivo});'
      ],
    ],
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.EXPR},\n` +
    `${Polyfill.NULL_CLSC},\n`
  )
})

test('test interface validation polyfill', (): void => {
  generatorTester(Program)(
    [
      [
        'definir interface IFoo bar fim ' +
        'definir classe Foo interfaces: IFoo propriedades: bar = "bar" fim',
        `let IFoo = { nome: 'IFoo', __props__: ['bar'] };\n` +
        `__pf__.validateInterface(IFoo, 'IFoo')\n` +
        `class Foo{\nstatic __propertiesDeclarations__() {if (this && this.bar === undefined) {this.bar = ${assignRhs('"bar"').slice(0, -1)}}\n}` +
        `constructor(){\nFoo.__propertiesDeclarations__.bind(this)()\n}}\nFoo.__propertiesDeclarations__.bind(null)()\nFoo.__attr__ = ['bar']\n` +
        `__pf__.validateInterfaceImpl('Foo', IFoo, Foo.__attr__)\n` +
        `\n__pf__.exports({bar,msg,foo,tru,Foo,arquivo,IFoo});`
      ],
    ],
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.INTERFACE_VLDT},\n` +
    `${Polyfill.EXPR},\n` +
    `${Polyfill.NULL_CLSC},\n` +
    `${Polyfill.INTERFACE_IMPL_VLDT},\n`
  )
})

test('test inheritance validation polyfill', (): void => {
  generatorTester(Program)(
    [
      [
        'definir classe Mae propriedades: boya fim ' +
        'definir classe Foo heranca: Mae propriedades: bar = "bar" fim',
        `class Mae{\nstatic __propertiesDeclarations__() {if (this && this.boya === undefined) {this.boya = null}\n}` +
        `constructor(){\nMae.__propertiesDeclarations__.bind(this)()\n}}\n` +
        `Mae.__propertiesDeclarations__.bind(null)()\nMae.__attr__ = ['boya']\n` +
        `__pf__.validateInheritance(Mae, 'Mae')\n` +
        `class Foo extends Mae{\nstatic __propertiesDeclarations__() {if (this && this.bar === undefined) {this.bar = ${assignRhs('"bar"').slice(0, -1)}}\n}` +
        `constructor(){\nsuper();\nFoo.__propertiesDeclarations__.bind(this)()\n}}\nFoo.__propertiesDeclarations__.bind(null)()\nFoo.__attr__ = ['bar']\n` +
        `\n__pf__.exports({bar,msg,foo,tru,Foo,arquivo,IFoo,Mae});`
      ],
    ],
    `${Polyfill.EXPORTS},\n` +
    `${Polyfill.IS_BROWSER},\n` +
    `${Polyfill.INHERITANCE_VLDT},\n` +
    `${Polyfill.EXPR},\n` +
    `${Polyfill.NULL_CLSC},\n`
  )
})
