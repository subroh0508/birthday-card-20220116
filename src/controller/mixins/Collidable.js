import { Gear } from '../../model/Gear';
import { Circle } from '../../model/abstract/Circle';
import { Draggable } from './Draggable';

export const Collidable = (P5Controller) => class extends Draggable(P5Controller) {
  _ref = null;

  collision(objA, objB) { return _collision(objA, objB); }

  collisions(point = null) { return _getCollisions(this.draggedObj, this.target, point); }

  mouseDragged() {
    if (this._isColliding) {
      this._moveAvoidingObject();
      return;
    }

    if (this._willCollide) {
      this._backToTangentPoint(this.collisions(this._afterDraggedPosition));
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

  _moveAvoidingObject() {
    if (!this.draggedObj) {
      return;
    }

    const collisions = this.collisions();
    const collision = Object.values(collisions)[0];

    const threshold = Math.pow(_calcDistanceThreshold(collision, this.draggedObj), 2);

    const d1X = collision.translateX - this._afterDraggedX;
    const d1Y = collision.translateY - this._afterDraggedY;

    const d1 = d1X * d1X + d1Y * d1Y;

    const { x, y } = this._calcTangentPoint(collisions);

    const d2X = collision.translateX - x;
    const d2Y = collision.translateY - y;

    const d2 = d2X * d2X + d2Y * d2Y;

    console.log(`d1, d2, threshold = ${d1}, ${d2}, ${threshold}`);
    const next =  (d1 < threshold || d1 < d2) ? { x, y } : { x: this.mouseX, y: this.mouseY };
    console.log(next)

    if (d1 < threshold || d1 < d2) {
      this.draggedObj.pressed(this.mouseX, this.mouseY);
      this.draggedObj.move(next.x, next.y);
    } else {
      // TODO 座標を返すメソッドに変える
      this._backToTangentPoint(collisions);
    }
  }

  // TODO 引数なくせるように
  _backToTangentPoint(collisions) {
    if (!this.draggedObj) {
      return;
    }

    const collision = Object.values(collisions)[0];
    if (!collision) {
      return;
    }

    const nextDistanceX = this._afterDraggedX - collision.translateX;
    const nextDistanceY = this._afterDraggedY - collision.translateY;

    const nextDistance = Math.sqrt(nextDistanceX * nextDistanceX + nextDistanceY * nextDistanceY);

    const threshold = _calcDistanceThreshold(collision, this.draggedObj);

    if (threshold < nextDistance) {
      super.mouseDragged();
      return;
    }

    const nowDistanceX = collision.translateX - this.draggedObj.translateX;
    const nowDistanceY = collision.translateY - this.draggedObj.translateY;

    const nowDistance = Math.sqrt(nowDistanceX * nowDistanceX + nowDistanceY * nowDistanceY);

    const backAmount = nowDistance - threshold;
    const theta = Math.asin(nowDistanceX / nowDistance);

    const x = this.draggedObj.translateX + backAmount * Math.cos(theta);
    const y = this.draggedObj.translateY + backAmount * Math.sin(theta);

    this.draggedObj.pressed(this.mouseX, this.mouseY);
    this.draggedObj.move(x, y);
  }

  _calcTangentPoint(collisions) {
    if (!this.draggedObj) {
      return;
    }

    const collision = Object.values(collisions)[0];
    if (!collision) {
      return;
    }

    const dx = this.movedX;
    const dy = this.movedY;

    const distanceX = collision.translateX - this.draggedObj.translateX;
    const distanceY = collision.translateY - this.draggedObj.translateY;

    const movement = dx * dx + dy * dy;

    const distance = Math.pow(_calcDistanceThreshold(collision, this.draggedObj), 2);
    const theta = Math.atan(distanceY / distanceX) + this._wrapDirection(collision) * (Math.PI / 2 - Math.asin(movement / (distance * 2)));

    const x = Math.sqrt(movement) * Math.cos(theta) + this.draggedObj.translateX;
    const y = Math.sqrt(movement) * Math.sin(theta) + this.draggedObj.translateY;

    return { x, y };
  }

  _hasCollision(point = null) { return Object.keys(this.collisions(point)).length !== 0; }
  _wrapDirection(collision) {
    if (!this._ref) {
      return 1;
    }

    const dx = this.mouseX - this._ref.x;
    const dy = this.mouseY - this._ref.y;

    if (Math.abs(dx) <= Math.abs(dy)) {
      return dy < 0 ? -1 : 1;
    }

    return (this._ref.y - collision.translateY) < 0 ? -1 : 1;
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

const _calcDistanceThreshold = (objA, objB) => {
  if (objA instanceof Gear && objB instanceof Gear) {
    return objA.innerRadius + objB.innerRadius + (objA.teethHeight + objB.teethHeight) / 2;
  }

  if (objA instanceof Circle && objB instanceof Circle) {
    return objA.radius + objB.radius;
  }

  return Infinity
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
