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

    this._graph = new Graph(_initAdjacencyList(this.target), this.hasPowerObjects);
  }

  mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions) {
    super.mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions);

    this._changeRotation(
      draggedObj,
      _additionalCollisions(collisions, nextCollisions),
      _removalCollisions(collisions, nextCollisions),
    );
  }

  _changeRotation(draggedObj, additional, removal) {
    if (!this._graph) {
      return;
    }

    this._graph.update(draggedObj, additional, removal);

    const targetMap = Object.fromEntries(this.target.map(t => [t.id, t]));

    _searchOrigin([draggedObj, ...additional, ...removal], this.target, this._graph).forEach(
      origin => Object.entries(_buildRotationList(origin, this.target, this._graph)).forEach(
        ([id, direction]) => targetMap[id] && (targetMap[id].direction = direction),
      ),
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

const _additionalCollisions = (collisions, nextCollisions) =>
  nextCollisions.filter(({ id }) => !collisions.find(c => c.id === id));
const _removalCollisions = (collisions, nextCollisions) =>
  !nextCollisions.length ? collisions : [];

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

const _searchOrigin = (objects, target, graph) => objects.reduce((acc, o) => {
  const originId = graph.getNodes(o)[0];
  const origin = target.find(t => t.id === originId);
  if (!origin || acc.some(a => a.id === origin.id)) {
    return acc;
  }

  return [...acc, origin];
}, []);

const _buildRotationList = (origin, target, graph) => {
  let rotation = { [origin.id]: origin.direction };

  graph.reduceNode(
    origin,
    (valid, currentId, next) => {
      const currentRotation = rotation[currentId];
      next.forEach(n => {
        if (rotation.hasOwnProperty(n.id)) {
          return;
        }

        rotation[n.id] = valid ? -currentRotation : RotateDirection.STOP;
      });

      if (!valid) {
        rotation[currentId] = RotateDirection.STOP;
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
    origin.hasPower,
  );

  return rotation;
}
