/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */

type LocNode = { value: { subscriptable: { value: {} }; locline: LocNode } }
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

type BoolNode = { value: { join: {}; booline: {} } }
export const mapBoolNode = (ast: unknown): any => {
  try {
    const tree = ast as BoolNode
    if (/^[ ]*$/.test(tree.value.booline as string)) {
      return tree.value.join
    }
    return ast
  } catch {
    return ast
  }
}

type JoinNode = { value: { equality: {}; joinline: {} } }
export const mapJoinNode = (ast: unknown): any => {
  try {
    const tree = ast as JoinNode
    if (/^[ ]*$/.test(tree.value.joinline as string)) {
      return tree.value.equality
    }
    return ast
  } catch {
    return ast
  }
}

type EqualityNode = { value: { rel: {}; equalityline: {} } }
export const mapEqualityNode = (ast: unknown): any => {
  try {
    const tree = ast as EqualityNode
    if (/^[ ]*$/.test(tree.value.equalityline as string)) {
      return tree.value.rel
    }
    return ast
  } catch {
    return ast
  }
}

type AddNode = { value: { term: {}; addline: {} } }
export const mapAddNode = (ast: unknown): any => {
  try {
    const tree = ast as AddNode
    if (/^[ ]*$/.test(tree.value.addline as string)) {
      return tree.value.term
    }
    return ast
  } catch {
    return ast
  }
}

type TermNode = { value: { unary: {}; termline: {} } }
export const mapTermNode = (ast: unknown): any => {
  try {
    const tree = ast as TermNode
    if (/^[ ]*$/.test(tree.value.termline as string)) {
      return tree.value.unary
    }
    return ast
  } catch {
    return ast
  }
}

type UnaryNode = { value: { factor: {}; unaryline: {} } }
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
