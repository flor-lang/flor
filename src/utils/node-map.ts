/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */

type LocNode = { value: { subscriptable: { value: {} }; locline: LocNode } }
/** Remap Loc Node
 *
 * Recursive loclines are assigned to a params property as a list
*/
export const mapLocNode = (ast: unknown): any => {
  try {
    const tree = ast as LocNode
    const locs: any[] = []
    let loc = tree.value.locline
    while (/^[ ]*$/.test((loc as unknown) as string) === false) {
      locs.push(loc)
      loc = loc.value.locline
    }
    const { locline, ...treeValue } = tree.value
    return {
      ...tree,
      value: {
        ...treeValue,
        params: locs.map((l): any[] => {
          l.value = l.value.variable.value
          return l
        })
      }
    }
  } catch {
    return ast
  }
}

type UnaryNode = { value: { factor: {}; unaryline: {} } }
/** Remap Unary Node
 *
 * Node are remapped with signal property
*/
export const mapUnaryNode = (ast: unknown): any => {
  try {
    const tree = ast as UnaryNode
    if (/^[ ]*$/.test(tree.value.unaryline as string)) {
      return tree.value.factor
    } else {
      const { unaryline, ...treeValue } = tree.value
      return {
        ...tree,
        value: {
          ...treeValue,
          signal: unaryline
        }
      }
    }
  } catch {
    return ast
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

const splitNodeLine = (node: { [x: string]: any }, nodeline: string): any => {
  const line = node[nodeline]
  delete node[nodeline]
  return [node, line]
}

const mapLine = (ast: unknown, nodeName: string, childName: string): any => {
  try {
    const lineName = nodeName + 'line'
    const [node, line] = splitNodeLine(ast, lineName)
    if (/^[ ]*$/.test((line as unknown) as string)) {
      return mapNodeLineWithEmptyLine(node)
    } else {
      return mountExprNode(nodeName, childName, ast, mapLine(line, nodeName, childName))
    }
  } catch {
    return ast
  }
}

/** Remap Arithmetic Recursive Node
 *
 * Recursive nodelines are assigned to a params property as a list
*/
export const mapArithmeticRecursiveNode = (ast: unknown): any => {
  try {
    const tree = ast as { name: string; value: { [x: string]: any } }
    const nodeName = tree.name
    const lineName = tree.name + 'line'
    const childName = Object.keys(tree.value).filter((k): boolean => k.endsWith('line') === false)[0]
    if (/^[ ]*$/.test(tree.value[lineName] as string)) {
      return mapNodeWithEmptyLine(tree, childName)
    } else {
      const node = mountExprNode(nodeName, childName, tree, mapLine(tree.value[lineName], nodeName, childName))
      delete node.value.parentOperator
      return node
    }
  } catch {
    return ast
  }
}
