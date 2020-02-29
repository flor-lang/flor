export const findDuplicates = <T>(arr: T[]): T[] => arr.filter((item: T, index: number): boolean => arr.indexOf(item) !== index)
