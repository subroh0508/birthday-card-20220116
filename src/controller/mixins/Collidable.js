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

    this._mouseDragged(this.draggedObj, collisions, nextCollisions);
  }

  _mouseDragged(draggedObj, collisions, nextCollisions) {
    const willCollideAtMultiplePoints = collisions.length < 2 && nextCollisions.length > 1;
    const isColliding = collisions.length > 0 && nextCollisions.length > 0;

    if (willCollideAtMultiplePoints) {
      this._moveToCollidingMultipleObjectsPoint(draggedObj, nextCollisions);
      return;
    }

    if (isColliding) {
      return;
    }

    const nextCollision = nextCollisions[0];
    const threshold = _calcDistanceThreshold(draggedObj, nextCollision);

    const willCollide = collisions.length === 0 && nextCollisions.length > 0
      && nextCollision.distance(this._afterDraggedPosition) <= threshold;

    if (willCollide) {
      this._moveToCollidingTwoObjectsPoint(draggedObj, nextCollision, threshold);
      return;
    }

    super.mouseDragged();
  }

  _moveToCollidingMultipleObjectsPoint(draggedObj, collisions) {
    const { x, y } = _calcTranslatePointFromTriangle(
      draggedObj,
      ..._sortCollisions(draggedObj, collisions),
    );

    draggedObj.pressed(this.mouseX, this.mouseY);
    draggedObj.move(x, y);
  }

  _moveToCollidingTwoObjectsPoint(draggedObj, collision, threshold) {
    const { x, y } = _calcTranslatePointFromTwoObjects(draggedObj, collision, threshold);

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
    return Math.trunc(target.distance(x, y)) <= Math.trunc(_calcDistanceThreshold(obj, target));
  }

  if (obj instanceof Circle && target instanceof Circle) {
    return Math.trunc(target.distance(x, y)) <= Math.trunc(_calcDistanceThreshold(obj, target));
  }

  return false;
}

const _getCollisions = (obj, target, point = null) => {
  if (!obj) {
    return {};
  }

  return target.filter(t => obj.id !== t.id && _collision(obj, t, point));
}

const _calcDistanceThreshold = (objA, objB) => {
  if (objA instanceof Gear && objB instanceof Gear) {
    return objA.innerRadius + objB.innerRadius + (objA.teethHeight + objB.teethHeight) / 2;
  }

  if (objA instanceof Circle && objB instanceof Circle) {
    return objA.radius + objB.radius;
  }

  return Infinity
}

const _sortCollisions = (draggedObj, collisions) => collisions.sort((a, b) => b.translateY - a.translateY || b.translateX - a.translateX);

const _calcTranslatePointFromTriangle = (a, b, c) => {
  const slope = (b.translateY - c.translateY) / (b.translateX - c.translateX);
  const intercept = b.translateY - slope * b.translateX;

  const sign = Math.sign(a.translateY - (slope * a.translateX + intercept)) * Math.sign(slope);

  const bc = b.distance(c);
  const ca = _calcDistanceThreshold(c, a);
  const ab = _calcDistanceThreshold(a, b);

  const angleB = Math.acos((ab * ab + bc * bc - ca * ca) / (2 * ab * bc));
  const theta = Math.acos((c.translateX - b.translateX) / bc) + sign * angleB

  return {
    x: b.translateX + ab * Math.cos(theta),
    y: b.translateY - ab * Math.sin(theta),
  };
}

const _calcTranslatePointFromTwoObjects = (draggedObj, collision, threshold) => {
  const nowDistance = draggedObj.distance(collision);

  const backAmount = nowDistance - threshold;
  const theta = Math.asin((collision.translateX - draggedObj.translateX) / nowDistance);

  return {
    x: draggedObj.translateX + backAmount * Math.cos(theta),
    y: draggedObj.translateY + backAmount * Math.sin(theta),
  };
}
