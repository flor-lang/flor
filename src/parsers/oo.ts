import * as P from 'parsimmon'
import '../utils/parsimmon-extension'
import { Define, Interface, End, Class, Inherit, Colon, Implements, Constructor, Properties } from './operators'
import { Identifier, IdentifierParser } from './assignment'
import { ObjectParser, BlockFunctionParser, BlockFunction } from './expressions'
import { findDuplicates } from './../utils/aux-functions'

export type InterfaceDeclarationParser = P.Parser<P.Node<'interface-declaration', {}>>
export type ClassDeclarationParser = P.Parser<P.Node<'class-declaration', {}>>

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
    P.lazy((): IdentifierParser => Identifier).named('parent')
  )
  .node('inheritance')

const MetaImplementations: ObjectParser = P
  .seqObj(
    Implements, P.optWhitespace,
    Colon, P.optWhitespace,
    P.lazy((): IdentifierParser => Identifier)
      .sepBy(P.whitespace)
      .named('interfaces')
  )
  .node('implementations')

const MetaConstructor: ObjectParser = P
  .seqObj(
    Constructor, P.optWhitespace,
    Colon, P.optWhitespace,
    P.lazy((): BlockFunctionParser => BlockFunction).named('function')
  )
  .node('constructor')

// const MetaProperties: ObjectParser = P
//   .seqObj(
//     Properties, P.optWhitespace,
//     Colon, P.optWhitespace,
//     P.seqMap(

//     ).sepBy(P.optWhitespace)
//   )
//   .node('properties')

export const Meta: ObjectParser = P
  .alt(
    MetaInheritance,
    MetaImplementations,
    MetaConstructor
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
    Meta.sepBy(P.whitespace).named('metas'),
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
        constructor: ast.metas.filter((m): boolean => m.name === 'constructor')[0] || ''
      }
    }
    return cAst
  })
  .node('class-declaration')
