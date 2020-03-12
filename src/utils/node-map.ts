/* eslint-disable @typescript-eslint/no-explicit-any */

export const mapLocNode = (ast: unknown): any => {
  try {
    const tree = (ast as unknown) as { value: { subscriptable: { value: {} }; locline: {} } }
    if (!tree.value.locline) {
      return tree.value.subscriptable.value
    }
    return ast
  } catch {
    return ast
  }
}
