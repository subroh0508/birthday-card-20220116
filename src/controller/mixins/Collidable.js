import { Gear } from '../../model/Gear';
import { Circle } from '../../model/abstract/Circle';
import { Draggable } from './Draggable';

export const Collidable = (P5Controller) => class extends Draggable(P5Controller) {
  collision(objA, objB) { return _collision(objA, objB); }

  collisions(point = null) { return _getCollisions(this.draggedObj, this.target, point); }

  mouseDragged() {
    if (!this.draggedObj) {
      return;
    }

    const collisions = this.collisions();
    const nextCollisions = this.collisions(this._afterDraggedPosition);

    this.mouseDraggedWithCollisions(this.draggedObj, collisions, nextCollisions);
  }

  mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions) {
    const isColliding = collisions.length > 0 && nextCollisions.length > 0;
    if (isColliding) {
      return;
    }

    const nextCollision = nextCollisions[0];

    const willCollide = collisions.length === 0 && nextCollisions.length > 0
      && nextCollision.distance(this._afterDraggedPosition) <= draggedObj.minDistance(nextCollision);

    if (willCollide) {
      this._moveToCollidingTwoObjectsPoint(draggedObj, nextCollision);
      return;
    }

    super.mouseDragged();
  }

  _moveToCollidingTwoObjectsPoint(draggedObj, collision) {
    const { x, y } = _calcTranslatePointFromTwoObjects(draggedObj, collision);

    draggedObj.pressed(this.mouseX, this.mouseY);
    draggedObj.move(x, y);
  }

  get _afterDraggedPosition() { return { x: this._afterDraggedX, y: this._afterDraggedY }; }
  get _afterDraggedX() { return this.mouseX - (!this.draggedObj ? 0 : this.draggedObj.pressedX); }
  get _afterDraggedY() { return this.mouseY - (!this.draggedObj ? 0 : this.draggedObj.pressedY); }
}

const _collision = (obj, target, point = null) => {
  const x = !point ? obj.translateX : point.x;
  const y = !point ? obj.translateY : point.y;

  if (obj instanceof Gear && target instanceof Gear) {
    return Math.trunc(target.distance(x, y)) <= Math.trunc(obj.minDistance(target));
  }

  if (obj instanceof Circle && target instanceof Circle) {
    return Math.trunc(target.distance(x, y)) <= Math.trunc(obj.minDistance(target));
  }

  return false;
}

const _getCollisions = (obj, target, point = null) => {
  if (!obj) {
    return {};
  }

  return target.filter(t => obj.id !== t.id && _collision(obj, t, point));
}

const _calcTranslatePointFromTwoObjects = (draggedObj, collision) => {
  const minDistance = draggedObj.minDistance(collision);
  const nowDistance = draggedObj.distance(collision);

  const backAmount = nowDistance - minDistance;
  const theta = Math.asin((collision.translateX - draggedObj.translateX) / nowDistance);

  return {
    x: draggedObj.translateX + backAmount * Math.cos(theta),
    y: draggedObj.translateY + backAmount * Math.sin(theta),
  };
}
