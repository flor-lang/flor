import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { Define, Interface, End, Class, Inherit, Colon, Implements, Constructor, Properties, ClassFieldModifier, Methods, Equal, New } from './operators'
import { Identifier, IdentifierParser } from './assignment'
import { ObjectParser, BlockFunctionParser, BlockFunction, InlineFunction, BoolParser, Bool, InlineFunctionParser } from './expressions'
import { findDuplicates } from './../utils/aux-functions'
import { FunctionCallParser, FunctionCall } from './statements'

export type InterfaceDeclarationParser = P.Parser<P.Node<'interface-declaration', {}>>
export type ClassDeclarationParser = P.Parser<P.Node<'class-declaration', {}>>
export type ClassInstantiationParser = P.Parser<P.Node<'class-instantiation', {}>>

/**
 * Parse interface declaration
 *
 * interface-declaration -> definir interface identifier identifiers fim
*/
export const InterfaceDeclaration: InterfaceDeclarationParser = P
  .seqObj(
    Define, Interface,
    P.lazy((): IdentifierParser => Identifier)
      .sepBy(P.whitespace)
      .named('properties'),
    End
  )
  .assert(
    (result: { properties: never[] }): boolean => result.properties.length > 1,
    'Definir interface exige um identificador e no mínimo uma variável'
  )
  .map((ast: { properties: never[] }): { identifier: {}; properties: never[] } => ({
    identifier: ast.properties[0],
    properties: ast.properties.splice(1)
  }))
  .node('interface-declaration')

const MetaInheritance: ObjectParser = P
  .seqObj(
    Inherit, P.optWhitespace,
    Colon, P.optWhitespace,
    P.lazy((): IdentifierParser => Identifier).named('parent'),
    P.whitespace
  )
  .node('inheritance')

const MetaImplementations: ObjectParser = P
  .seqObj(
    Implements, P.optWhitespace,
    Colon, P.optWhitespace,
    P.lazy((): IdentifierParser => Identifier)
      .sepBy(P.whitespace)
      .named('interfaces'),
    P.whitespace
  )
  .node('implementations')

const MetaConstructor: ObjectParser = P
  .seqObj(
    Constructor, P.optWhitespace,
    Colon, P.optWhitespace,
    P.lazy((): BlockFunctionParser => BlockFunction).named('function')
  )
  .node('constructor')

const PropertyDeclaration: ObjectParser = P
  .seqObj(
    P.alt(ClassFieldModifier.wspc(), P.optWhitespace).named('access-modifier'),
    P.lazy((): IdentifierParser => Identifier).named('identifier'),
    P.alt(
      P.seqObj(
        P.optWhitespace, Equal, P.optWhitespace,
        P.lazy((): BoolParser => Bool).named('bool')
      ),
      P.optWhitespace
    ).named('assignment')
  )

const MetaProperties: ObjectParser = P
  .seqObj(
    Properties, P.optWhitespace,
    Colon, P.optWhitespace,
    PropertyDeclaration.many().named('declarations')
  )
  .node('properties')

const MethodDeclaration: ObjectParser = P
  .seqObj(
    P.alt(ClassFieldModifier.wspc(), P.optWhitespace).named('access-modifier'),
    P.seqObj(
      P.lazy((): IdentifierParser => Identifier).named('identifier'),
      P.optWhitespace, Equal, P.optWhitespace,
      P.alt(
        P.lazy((): InlineFunctionParser => InlineFunction),
        P.lazy((): BlockFunctionParser => BlockFunction)
      ).named('function')
    ).named('assignment')
  )

const MetaMethods: ObjectParser = P
  .seqObj(
    Methods, P.optWhitespace,
    Colon, P.optWhitespace,
    MethodDeclaration.many().named('declarations')
  )
  .node('methods')

const Meta: ObjectParser = P
  .alt(
    MetaInheritance,
    MetaImplementations,
    MetaProperties,
    MetaConstructor,
    MetaMethods
  )

/**
 * Parse interface declaration
 *
 * class-declaration -> definir classe identifier
 *  meta-inherintance
 *  meta-implementations
 *  meta-constructor
 *  meta-properties
 *  meta-methods
 * fim
*/
export const ClassDeclaration: ClassDeclarationParser = P
  .seqObj(
    Define, Class,
    P.lazy((): IdentifierParser => Identifier).named('identifier'), P.whitespace,
    Meta.many().named('metas'),
    End
  )
  .assert((result: { identifier: {}; metas: { name: string }[] }): boolean => {
    const metaNames = result.metas.map((m): string => m.name)
    return findDuplicates(metaNames).length === 0
  }, 'Configuração da classe duplicada')
  .map((ast: { identifier: {}; metas: { name: string }[] }): {} => {
    const cAst = {
      identifier: ast.identifier,
      meta: {
        inheritance: ast.metas.filter((m): boolean => m.name === 'inheritance')[0] || '',
        implementations: ast.metas.filter((m): boolean => m.name === 'implementations')[0] || '',
        constructor: ast.metas.filter((m): boolean => m.name === 'constructor')[0] || '',
        properties: ast.metas.filter((m): boolean => m.name === 'properties')[0] || '',
        methods: ast.metas.filter((m): boolean => m.name === 'methods')[0] || ''
      }
    }
    return cAst
  })
  .node('class-declaration')

/**
 * Parser class instantiation expression
 *
 * class-instantiation -> novo function-call | nova function-call
 */
export const ClassInstantiation: ClassInstantiationParser = P
  .seqObj(
    New, P.lazy((): FunctionCallParser => FunctionCall).named('constructor')
  )
  .node('class-instantiation')
