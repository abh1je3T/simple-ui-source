export function getSeparatorIndexes(group: number[] = [], length: number) {
  const result: number[] = [];

  let sum = 0;

  for (const g of group) {
    sum += g;

    // avoid trailing separator
    if (sum < length) {
      result.push(sum - 1);
    }
  }

  return result;
}
