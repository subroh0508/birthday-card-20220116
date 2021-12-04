import { collision } from './Collidable';
import { Chainable } from './Chainable';

export const Engageable = (P5Controller) => class extends Chainable(P5Controller) {
  _adjancency = {};

  mousePressed() {
    super.mousePressed();

    if (!Object.keys(this._adjancency).length) {
      this._adjancency = _initAdjancency(this.target);
    }
  }

  mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions) {
    super.mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions);

    this._adjancency = _updateAdjancency(this._adjancency, draggedObj, collisions, nextCollisions);
    console.log(this._adjancency);
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

const _initAdjancency = (target) => _combination(target, 2).reduce((acc, [objA, objB]) => {
  if (!collision(objA, objB)) {
    return acc;
  }

  acc[objA.id] = [...(acc[objA.id] || []), objB];
  acc[objB.id] = [...(acc[objB.id] || []), objA];

  return acc;
}, {});

const _updateAdjancency = (adjancency, draggedObj, collisions, nextCollisions) => {
  const additional = nextCollisions.filter(({ id }) => !collisions.find(c => c.id === id));
  const removal = !nextCollisions.length ? collisions : [];

  if (!additional.length && !removal.length) {
    return adjancency;
  }

  adjancency[draggedObj.id] = additional.reduce(
    (acc, obj) => !acc.some(c => c.id === obj.id) ? [...acc, obj] : acc,
    adjancency[draggedObj.id] || [],
  ).filter(obj => !removal.some(c => c.id === obj.id));

  additional.forEach(obj => {
    adjancency[obj.id] = [...(adjancency[obj.id] || []).filter(c => c.id !== draggedObj.id), draggedObj];
  });

  removal.forEach(obj => {
    adjancency[obj.id] = (adjancency[obj.id] || []).filter(c => c.id !== draggedObj.id);
  });

  return adjancency;
};

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
