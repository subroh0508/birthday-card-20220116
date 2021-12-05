let id = 0;

export function genUniqId() { return id++; }

export const combination = (objects, k) => {
  if (objects.length < k) {
    return [];
  }

  if (k === 1) {
    return objects.map((obj) => [obj]);
  }

  let comb = [];
  for (let i = 0; i <= objects.length - k; i++) {
    const row = combination(objects.slice(i + 1), k - 1);
    comb = [...comb, ...row.map((r) => [objects[i], ...r])];
  }

  return comb;
};
