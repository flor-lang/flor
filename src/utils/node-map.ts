/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */

type LocNode = { value: { subscriptable: { value: {} }; locline: LocNode } }
/** Remap Loc Node
 *
 * Recursive loclines are assigned to a params property as a list
*/
export const mapLocNode = (ast: unknown): any => {
  const tree = ast as LocNode
  const locs: any[] = []
  let loc = tree.value.locline
  while (/^[ ]*$/gm.test((loc as unknown) as string) === false) {
    locs.push(loc)
    loc = loc.value.locline
  }
  const { locline, ...treeValue } = tree.value
  return {
    ...tree,
    value: {
      ...treeValue,
      params: locs.map((l): any[] => {
        l.value = l.value.param.value
        return l
      })
    }
  }
}

type UnaryNode = { value: { factor: {}; unaryline: {} } }
/** Remap Unary Node
 *
 * Node are remapped with signal property
*/
export const mapUnaryNode = (ast: unknown): any => {
  const tree = ast as UnaryNode
  if (/^[ ]*$/gm.test(tree.value.unaryline as string)) {
    return tree.value.factor
  } else {
    const { unaryline, ...treeValue } = tree.value
    return {
      ...tree,
      value: [
        { name: 'operator', value: unaryline },
        treeValue.factor
      ]
    }
  }
}

const mountExprNode = (
  nodeName: string,
  childName: string,
  node: { [x: string]: any },
  nodeline: { [x: string]: any; parentOperator: any }
): any => {
  const { parentOperator, ...child } = nodeline
  return {
    name: nodeName,
    value: {
      parentOperator: node['operator'],
      operator: parentOperator || child.value.parentOperator,
      params: [
        node[childName] || node.value[childName],
        child[childName] || ((child): any => {
          delete child.value.parentOperator
          return child
        })(child)
      ]
    }
  }
}

const mapNodeWithEmptyLine = (node: { value: { [x: string]: any } }, childName: string): any => node.value[childName]
const mapNodeLineWithEmptyLine = (nodes: { [x: string]: any; operator: any }): any => {
  const { operator, ...metadata } = nodes
  return { ...metadata, parentOperator: operator }
}

type ExprNode = { value: { operator: any; params: {}[] } }
const mapNodeParamsWithOperator = (node: ExprNode): any => {
  const mapOperator = (node: ExprNode): any => {
    if (!node.value.operator) {
      return node
    }
    const operatorNode = { name: 'operator', value: node.value.operator }
    delete node.value.operator
    node.value.params.map(mapOperator)
    node.value.params.splice(1, 0, operatorNode)
    return { ...node, value: node.value.params }
  }
  return mapOperator(node)
}

const splitNodeLine = (node: { [x: string]: any }, nodeline: string): any => {
  const line = node[nodeline]
  delete node[nodeline]
  return [node, line]
}

const mapLine = (ast: unknown, nodeName: string, childName: string): any => {
  const lineName = nodeName + 'line'
  const [node, line] = splitNodeLine(ast, lineName)
  if (/^[ ]*$/gm.test((line as unknown) as string)) {
    return mapNodeLineWithEmptyLine(node)
  } else {
    return mountExprNode(nodeName, childName, ast, mapLine(line, nodeName, childName))
  }
}

/** Remap Arithmetic Recursive Node
 *
 * Recursive nodelines are assigned to a params property as a list
*/
export const mapArithmeticRecursiveNode = (ast: unknown): any => {
  const tree = ast as { name: string; value: { [x: string]: any } }
  const nodeName = tree.name
  const lineName = tree.name + 'line'
  const childName = Object.keys(tree.value).filter((k): boolean => k.endsWith('line') === false)[0]
  if (/^[ ]*$/gm.test(tree.value[lineName] as string)) {
    return mapNodeWithEmptyLine(tree, childName)
  } else {
    const node = mountExprNode(nodeName, childName, tree, mapLine(tree.value[lineName], nodeName, childName))
    delete node.value.parentOperator
    return mapNodeParamsWithOperator(node)
  }
}

export const mapClassDeclarationNode = (ast: { identifier: {}; metas: { name: string }[] }): any => ([
  ast.identifier,
  {
    name: 'class-meta',
    value: [
      ast.metas.filter((m): boolean => m.name === 'inheritance')[0] || { name: 'inheritance', value: '' },
      { name: 'implementations', value: ast.metas.filter((m): boolean => m.name === 'implementations')[0] || '' },
      { name: 'constructor', value: ast.metas.filter((m): boolean => m.name === 'constructor')[0] || '' },
      { name: 'properties', value: ast.metas.filter((m): boolean => m.name === 'properties')[0] || '' },
      { name: 'methods', value: ast.metas.filter((m): boolean => m.name === 'methods')[0] || '' }
    ]
  }
])

interface Node { name: string; value: Node | Node[] }
interface ParsedNode { name: string; value: { [key: string]: Node } }

export const nodePropertiesMapper = (properties: string[]): any =>
  (ast: ParsedNode): Node => {
    const nodeValues = properties.map((property): Node => {
      const value = ast.value[property]
      return (value && 'name' in value) ? value : { name: property, value }
    })
    delete ast.value
    return { ...ast, value: nodeValues.length === 1 ? nodeValues[0] : nodeValues }
  }
