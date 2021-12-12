let id = 0;

export const TWO_PI = Math.PI * 2;

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

export const degToRad = (degree) => Math.PI * 2 / 360 * degree;

export const distance = (model, ...args) => {
  if (!model.hasOwnProperty('translateX') || !model.hasOwnProperty('translateY')) {
    return -1;
  }

  switch (args.length) {
    case 1:
      const other = args[0];
      return _distanceFromModel(model, other);
    case 2:
      const [x, y] = args;
      return Math.sqrt(Math.pow(model.translateX - x, 2) + Math.pow(model.translateY - y, 2));
    default:
      return -1;
  }
};

const _distanceFromModel = (modelA, modelB) => {
  if (modelB.hasOwnProperty('translateX') && modelB.hasOwnProperty('translateY')) {
    return distance(modelA, modelB.translateX, modelB.translateY);
  }

  if (modelB.hasOwnProperty('x') && modelB.hasOwnProperty('y')) {
    return distance(modelA, modelB.x, modelB.y);
  }

  return -1;
};
