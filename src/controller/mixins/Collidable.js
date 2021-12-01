import { Gear } from '../../model/Gear';
import { Circle } from '../../model/abstract/Circle';
import { Draggable } from './Draggable';

export const Collidable = (P5Controller) => class extends Draggable(P5Controller) {
  _ref = null;

  collision(objA, objB) { return _collision(objA, objB); }

  collisions(point = null) { return _getCollisions(this.draggedObj, this.target, point); }

  mouseDragged() {
    if (!this.draggedObj) {
      return;
    }

    const collisions = this.collisions();
    const nextCollisions = this.collisions(this._afterDraggedPosition);

    if (Object.keys(nextCollisions).length === 2) {
      this._moveBothCollidingPoint(this.draggedObj, nextCollisions);
      return;
    }

    if (this._isColliding) {
      this._moveAvoidingObject(this.draggedObj, collisions);
      return;
    }

    if (this._willCollide) {
      this._backToTangentPoint(this.draggedObj, nextCollisions);
      return;
    }

    super.mouseDragged();
  }

  mousePressed() {
    super.mousePressed();
    this._ref = { x: this.mouseX, y: this.mouseY };
  }

  mouseReleased() {
    super.mouseReleased();
    this._ref = null;
  }

  get _isColliding() { return this._hasCollision() && this._hasCollision(this._afterDraggedPosition); }
  get _willCollide() { return !this._hasCollision() && this._hasCollision(this._afterDraggedPosition); }

  // 特定の並びの時のみうまくハマる
  _moveBothCollidingPoint(draggedObj, collisions) {
    const collision1 = Object.values(collisions)[0];
    const collision2 = Object.values(collisions)[1];

    const a = collision1.distance(collision2);
    const b = _calcDistanceThreshold(collision1, draggedObj);
    const c = _calcDistanceThreshold(draggedObj, collision2);

    const angleB = Math.acos((c * c + a * a - b * b) / (2 * c * a));
    const theta = Math.acos((collision1.translateX - collision2.translateX) / a) - angleB

    const x = c * Math.cos(theta) + collision2.translateX;
    const y = c * Math.sin(theta) + collision2.translateY;

    console.log(collision1.translateX, collision1.translateY);
    console.log(collision2.translateX, collision2.translateY);
    console.log(x, y);
    draggedObj.pressed(this.mouseX, this.mouseY);
    draggedObj.move(x, y);
  }

  _moveAvoidingObject(draggedObj, collisions) {
    const collision = Object.values(collisions)[0];

    const threshold = _calcDistanceThreshold(draggedObj, collision);

    const d1X = collision.translateX - this._afterDraggedX;
    const d1Y = collision.translateY - this._afterDraggedY;

    const d1 = d1X * d1X + d1Y * d1Y;

    const wrapDirection = _calcWrapDirection(collision, this._ref, this.mouseX, this.mouseY);
    const { x, y } = _calcWrapAroundPoint(draggedObj, collision, this.movedX, this.movedY, wrapDirection);

    const d2X = collision.translateX - x;
    const d2Y = collision.translateY - y;

    const d2 = d2X * d2X + d2Y * d2Y;

    if (d1 < threshold * threshold || d1 < d2) {
      draggedObj.pressed(this.mouseX, this.mouseY);
      draggedObj.move(x, y);
      return;
    }

    if (_nextDistanceLessThanThreshold(draggedObj, collision, this._afterDraggedPosition)) {
      const { x, y } = _calcTangentPoint(draggedObj, collision);

      draggedObj.pressed(this.mouseX, this.mouseY);
      draggedObj.move(x, y);
      return;
    }

    super.mouseDragged();
  }

  _backToTangentPoint(draggedObj, collisions) {
    const collision = Object.values(collisions)[0];

    if (_nextDistanceLessThanThreshold(draggedObj, collision, this._afterDraggedPosition)) {
      const { x, y } = _calcTangentPoint(draggedObj, collision);

      draggedObj.pressed(this.mouseX, this.mouseY);
      draggedObj.move(x, y);
      return;
    }

    super.mouseDragged();
  }

  _hasCollision(point = null) { return Object.keys(this.collisions(point)).length !== 0; }

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

  return Object.fromEntries(
    target.filter(t => obj.id !== t.id && _collision(obj, t, point))
      .map(t => [t.id, t]),
  );
}

const _nextDistanceLessThanThreshold =
  (draggedObj, collision, next) => collision.distance(next.x, next.y) <= _calcDistanceThreshold(draggedObj, collision);

const _calcDistanceThreshold = (objA, objB) => {
  if (objA instanceof Gear && objB instanceof Gear) {
    return objA.innerRadius + objB.innerRadius + (objA.teethHeight + objB.teethHeight) / 2;
  }

  if (objA instanceof Circle && objB instanceof Circle) {
    return objA.radius + objB.radius;
  }

  return Infinity
}

const _calcTangentPoint = (draggedObj, collision) => {
  const threshold = _calcDistanceThreshold(draggedObj, collision);

  const nowDistanceX = collision.translateX - draggedObj.translateX;
  const nowDistanceY = collision.translateY - draggedObj.translateY;

  const nowDistance = Math.sqrt(nowDistanceX * nowDistanceX + nowDistanceY * nowDistanceY);

  const backAmount = nowDistance - threshold;
  const theta = Math.asin(nowDistanceX / nowDistance);

  const x = draggedObj.translateX + backAmount * Math.cos(theta);
  const y = draggedObj.translateY + backAmount * Math.sin(theta);

  return { x, y };
}

const _calcWrapDirection = (collision, ref, mouseX, mouseY) => {
  if (!ref) {
    return 1;
  }

  const dx = mouseX - ref.x;
  const dy = mouseY - ref.y;

  if (Math.abs(dx) <= Math.abs(dy)) {
    return dy < 0 ? -1 : 1;
  }

  return (ref.y - collision.translateY) < 0 ? -1 : 1;
}

const _calcWrapAroundPoint = (draggedObj, collision, dx, dy, wrapDirection) => {
  const distanceX = collision.translateX - draggedObj.translateX;
  const distanceY = collision.translateY - draggedObj.translateY;

  const movement = dx * dx + dy * dy;

  const distance = Math.pow(_calcDistanceThreshold(collision, draggedObj), 2);
  const theta = Math.atan(distanceY / distanceX) + wrapDirection * (Math.PI / 2 - Math.asin(movement / (distance * 2)));

  const x = Math.sqrt(movement) * Math.cos(theta) + draggedObj.translateX;
  const y = Math.sqrt(movement) * Math.sin(theta) + draggedObj.translateY;

  return { x, y };
}
