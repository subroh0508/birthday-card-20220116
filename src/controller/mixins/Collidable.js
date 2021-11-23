import { Gear } from '../../model/Gear';
import { Circle } from '../../model/abstract/Circle';

export const Collidable = (P5Controller) => class extends P5Controller {
  _adjancency = {};

  collision(objA, objB) {
    if (objA instanceof Gear && objB instanceof Gear) {
      return objA.distance(objB) <= objA.innerRadius + objB.innerRadius;
    }

    if (objA instanceof Circle && objB instanceof Circle) {
      return objA.distance(objB) <= objA.radius + objB.radius;
    }

    return false;
  }

  mousePressed() {
    super.mousePressed();

    this._adjancency = {};
    _combination(this.target, 2).forEach(([objA, objB]) => {
      if (!this.collision(objA, objB)) {
        return;
      }

      const listA = this._adjancency[objA.id] || [];
      const listB = this._adjancency[objB.id] || [];

      this._adjancency[objA.id] = [...listA, objB.id];
      this._adjancency[objB.id] = [...listB, objA.id];
    });
    console.log('combination: ', _combination(this.target, 2));
    console.log('_adjancency: ', JSON.stringify(this._adjancency));
  }

  mouseDragged() {
    super.mouseDragged();
  }

  mouseReleased() {
    super.mouseReleased();
  }
}

const _combination = (objects, k) => {
  if (objects.length < k) {
    return [];
  }

  if (k === 1) {
    return objects.map((obj) => [obj]);
  }

  let combination = [];
  for (let i = 0; i <= objects.length - k; i++) {
    const row = _combination(objects.slice(i + 1), k - 1);
    combination = [...combination, ...row.map((r) => [objects[i], ...r])];
  }

  return combination;
};
