/* eslint-disable @typescript-eslint/no-explicit-any */

export const mapLocNode = (ast: unknown): any => {
  type LocNode = { value: { subscriptable: { value: {} }; locline: LocNode } }
  try {
    const tree = ast as LocNode
    const locs: any[] = []
    let loc = tree.value.locline
    while (/^[ ]*$/.test(<string> (loc as unknown)) === false) {
      locs.push(loc)
      loc = loc.value.locline
    }
    const { locline, ...treeValue } = tree.value
    return {
      ...tree,
      value: {
        ...treeValue,
        params: locs.map(l => {
          l.value = l.value.variable.value
          return l
        })
      }
    }
  } catch {
    return ast
  }
}

export const mapBoolNode = (ast: unknown): any => {
  type BoolNode = {}
  try {
    const tree = ast as BoolNode
    // if (/^[ ]*$/.test(<string> tree) {

    // }
    return ast
  } catch {
    return ast
  }
}
