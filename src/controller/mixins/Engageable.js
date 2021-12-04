import { Chainable } from './Chainable';

export const Engageable = (P5Controller) => class extends Chainable(P5Controller) {
  _adjancency = {};

  mousePressed() {
    super.mousePressed();

    this._adjancency = {};
    _combination(this.target, 2).forEach(([objA, objB]) => {
      if (!this.collision(objA, objB)) {
        return;
      }

      const listA = this._adjancency[objA.id] || [];
      const listB = this._adjancency[objB.id] || [];

      this._adjancency[objA.id] = [...listA, objB];
      this._adjancency[objB.id] = [...listB, objA];
    });
    console.log(this._adjancency);
  }

  mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions) {
    super.mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions);

    this._changeRotation(
      draggedObj,
      Object.fromEntries(collisions.map(t => [t.id, t])),
    );
  }

  _changeRotation(draggedObj, collisions) {
    const hasPower = draggedObj && draggedObj.hasPower;
    switch (hasPower) {
      case true:
        _changeRotationDirectionActively(draggedObj, this.target, collisions);
        break;
      case false:
        _changeRotationDirectionPassively(draggedObj, this.target, collisions);
        break;
      default:
        break;
    }
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

const _changeRotationDirectionActively = (dragged, target, collisions) => {
  target.forEach(t => {
    if (collisions[t.id]) {
      t.direction = -dragged.direction;
      return;
    }

    t.rotateStop();
  });
}

const _changeRotationDirectionPassively = (dragged, target, collisions) => {
  if (Object.values(collisions).every(c => c.isStopped())) {
    dragged.rotateStop();
    return;
  }

  target.forEach(t => {
    const collision = collisions[t.id]
    if (collision) {
      dragged.direction = -collision.direction;
    }
  });
}
