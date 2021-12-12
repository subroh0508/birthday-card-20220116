import { Circle } from './model/abstract/Circle';
import { Clock } from './model/abstract/Clock';

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

export const distance = (...args) => {
  switch (args.length) {
    case 1:
      const model = args[0];
      return this._distanceFromModel(model);
    case 2:
      const [x, y] = args;
      return Math.sqrt(Math.pow(this.translateX - x, 2) + Math.pow(this.translateY - y, 2));
    default:
      return -1;
  }
};

const _distanceFromModel = (model) => {
  if (model instanceof Circle || model instanceof Clock) {
    return this.distance(model.translateX, model.translateY);
  }

  if (model.hasOwnProperty('x') && model.hasOwnProperty('y')) {
    return this.distance(model.x, model.y);
  }

  return -1;
};
