import { collision } from './Collidable';
import { Chainable } from './Chainable';
import { Graph } from '../supports/Graph';
import { RotateDirection } from '../../model/mixins/Rotatable';

export const Engageable = (P5Controller) => class extends Chainable(P5Controller) {
  _adjancencyList = {};
  _graph = null;

  get hasPowerObjects() { return this.target.filter(t => t.hasPower); }

  mousePressed() {
    super.mousePressed();

    if (!this._graph) {
      this._graph = new Graph(_initAdjacencyList(this.target), this.hasPowerObjects);
    }
  }

  mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions) {
    super.mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions);

    this._graph.update(draggedObj, collisions, nextCollisions);
    console.log(this._graph._graph);
    this._changeRotation();
  }

  _changeRotation() {
    if (!this.draggedObj || !this._graph) {
      return;
    }

    const targetMap = Object.fromEntries(this.target.map(t => [t.id, t]));

    Object.entries(_buildRotationList(this.draggedObj, this.target, this._graph)).forEach(
      ([id, direction]) => targetMap[id] && (targetMap[id].direction = direction),
    );
  }
}

const _initAdjacencyList = (target) => _combination(target, 2).reduce((acc, [objA, objB]) => {
  if (!collision(objA, objB)) {
    return acc;
  }

  acc[objA.id] = [...(acc[objA.id] || []), objB];
  acc[objB.id] = [...(acc[objB.id] || []), objA];

  return acc;
}, {});

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

const _buildRotationList = (draggedObj, target, graph) => {
  const originId = graph.getNodes(draggedObj)[0];
  const origin = target.find(t => t.id === originId);
  if (!origin) {
    return {};
  }

  let rotation = { [originId]: origin.direction };

  graph.reduceNode(
    draggedObj,
    (valid, currentId, next) => {
      const currentRotation = rotation[currentId];
      next.forEach(n => {
        if (rotation.hasOwnProperty(n.id)) {
          return;
        }

        rotation[n.id] = valid ? -currentRotation : RotateDirection.STOP;
      });

      if (!valid) {
        return false;
      }

      if (
        next.some(
          n => (n.hasPower && n.direction === currentRotation)
            || (rotation[n.id] === currentRotation),
        )
      ) {
        rotation = Object.fromEntries(
          Object.entries(rotation).map(([id, _]) => [Number(id), RotateDirection.STOP]),
        );
        return false;
      }

      return true;
    },
    !origin.isStopped(),
  );

  return rotation;
}

const _searchNearestRotatingObjects = (dragged, adjancencyList) => {

};

const _chainObjectsRecursively = (origin, now, prev, adjancencyList) => {
  console.log(`now.id = ${now.id}/origin.id = ${origin.id}`, (adjancencyList[now.id] || []).filter(o => o.id !== (prev && prev.id)));
  const excludes = (now, origin) => !origin.some(o => o.id === now.id);
  const nextAdjancencyList = (nextId, list) => (
    { ...list, [nextId]: (list[nextId] || []).filter(o => o.id !== now.id) }
  );

  const next = (adjancencyList[now.id] || []).filter(o => o.id !== (prev && prev.id));

  switch (next.length) {
    case 0:
      return now.id !== origin.id ? [now, new EndOfLine()] : [now];
    case 1:
      return next[0].id !== origin.id ? [
        now,
        ..._chainObjectsRecursively(origin, next[0], now, adjancencyList),
      ] : [now];
    default:
      return next.map(
        a => a.id !== origin.id ? [
          now,
          ..._chainObjectsRecursively(now, a, now, adjancencyList),
        ]: [now],
      );
  }
};

class EndOfLine {}

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
