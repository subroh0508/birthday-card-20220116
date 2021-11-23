import { Gear } from '../../model/Gear';
import { Circle } from '../../model/abstract/Circle';
import { Draggable } from './Draggable';

export const Collidable = (P5Controller) => class extends Draggable(P5Controller) {
  _adjancency = {};

  collision(obj) { return this.target.some((t) => obj.id !== t.id && _collision(obj, t)); }

  mousePressed() {
    super.mousePressed();

    this._adjancency = {};
    _combination(this.target, 2).forEach(([objA, objB]) => {
      if (!_collision(objA, objB)) {
        return;
      }

      const listA = this._adjancency[objA.id] || [];
      const listB = this._adjancency[objB.id] || [];

      this._adjancency[objA.id] = [...listA, objB.id];
      this._adjancency[objB.id] = [...listB, objA.id];
    });
  }

  mouseDragged() {
    if (this.collision(this.nextObj())) {
      return;
    }

    super.mouseDragged();
  }

  nextObj() {
    if (!this.draggedObj) {
      return null;
    }

    const obj = Object.create(this.draggedObj);
    obj.drag(this.mouseX, this.mouseY);

    return obj;
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

const _collision = (objA, objB) => {
  if (objA instanceof Gear && objB instanceof Gear) {
    return objA.distance(objB) <= objA.innerRadius + objB.innerRadius + (objA.teethHeight + objB.teethHeight) / 2;
  }

  if (objA instanceof Circle && objB instanceof Circle) {
    return objA.distance(objB) <= objA.radius + objB.radius;
  }

  return false;
}
