import { Gear } from '../../model/Gear';
import { Circle } from '../../model/abstract/Circle';
import { Draggable } from './Draggable';

export const Collidable = (P5Controller) => class extends Draggable(P5Controller) {
  collision(objA, objB) { return _collision(objA, objB); }

  get collisions() { return _getCollisions(this.draggedObj, this.target); }

  mouseDragged() {
    if (this._isCollidingAndCannotMove) {
      this._moveAvoidingObject(this.collisions);
      //const { x, y } = this._calcTangentPoint(this.collisions);
      //this.draggedObj.move(x, y);
      return;
    }

    if (this._isCollidingAndCanMove) {
      this._moveAvoidingObject(this.collisions);
      return;
    }

    // TODO 回り込み移動中に一瞬オブジェクトから離れた直後のwillCollideブロックどうするか
    if (this._willCollide) {
      this._backToTangentPoint(this._collisionsAfterDragged);
      return;
    }

    super.mouseDragged();
  }

  get _isCollidingAndCannotMove() { return this._hasCollision && this._hasCollisionAfterDragged; }
  get _isCollidingAndCanMove() { return this._hasCollision && !this._hasCollisionAfterDragged; }
  get _willCollide() { return !this._hasCollision && this._hasCollisionAfterDragged; }

  _moveAvoidingObject(collisions) {
    if (!this.draggedObj) {
      return;
    }

    const collision = Object.values(collisions)[0];

    const threshold = Math.pow(_calcDistanceThreshold(collision, this.draggedObj), 2);

    const d1X = collision.translateX - (this.mouseX - this.draggedObj.pressedX);
    const d1Y = collision.translateY - (this.mouseY - this.draggedObj.pressedY);

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
      this._backToTangentPoint(collisions);
    }
  }

  _backToTangentPoint(collisions) {
    if (!this.draggedObj) {
      return;
    }

    const collision = Object.values(collisions)[0];
    if (!collision) {
      return;
    }

    const nextX = this.mouseX - this.draggedObj.pressedX;
    const nextY = this.mouseY - this.draggedObj.pressedY;

    const nextDistanceX = nextX - collision.translateX;
    const nextDistanceY = nextY - collision.translateY;

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
    console.log('will collide', x, y, backAmount);
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

    // pressedX - translateX / pressedY - translateYの符号がdrag中の方向になる？
    // 衝突時の絶対座標 = (this.draggedObj.translateX + this.draggedObj.pressedX, this.draggedObj.translateY + this.draggedObj.pressedY)

    const dx = this.movedX;
    const dy = this.movedY;

    const signX = Math.sign(this.mouseX - (this.draggedObj.translateX + this.draggedObj.pressedX));
    const signY = Math.sign(this.mouseY - (this.draggedObj.translateY + this.draggedObj.pressedY));

    const distanceX = collision.translateX - this.draggedObj.translateX;
    const distanceY = collision.translateY - this.draggedObj.translateY;
    /*
    const distanceX = signX * Math.abs(collision.translateX - this.draggedObj.translateX);
    const distanceY = signY * Math.abs(collision.translateY - this.draggedObj.translateY);
    */

    const movement = dx * dx + dy * dy;

    //const distance = distanceX * distanceX + distanceY * distanceY;
    const distance = Math.pow(_calcDistanceThreshold(collision, this.draggedObj), 2);
    const theta = Math.atan(distanceY / distanceX) + (Math.PI / 2 - Math.asin(movement / (distance * 2)));

    const x = Math.sqrt(movement) * Math.cos(theta) + this.draggedObj.translateX;
    const y = Math.sqrt(movement) * Math.sin(theta) + this.draggedObj.translateY;

    const nextDistance = Math.pow(collision.translateX - x, 2) + Math.pow(collision.translateY - y, 2)
    console.log(Math.sqrt(distance), Math.sqrt(nextDistance))
    if (nextDistance < distance) {
      console.log(`aaa init: (x, y) = (${this.draggedObj.translateX}, ${this.draggedObj.translateY})`);
      console.log(`aaa move: (x, y) = (${this.movedX}, ${this.movedY})`);
      console.log(`(signX, signY) = (${signX}, ${signY}) / (${this.mouseX} - ${this.draggedObj.pressedX}, ${this.mouseY} - ${this.draggedObj.pressedY})`);
      console.log(`(dx, dy, move) = (${dx}, ${dy}, ${movement})`);
      console.log(`aaa result: (x, y) = (${movement * Math.cos(theta)}, ${movement * Math.sin(theta)})`);
    }
    return { x, y };
  }

  get _objectAfterDragged() {
    if (!this.draggedObj) {
      return null;
    }

    const nextObj = Object.create(this.draggedObj);
    nextObj.drag(this.mouseX, this.mouseY);

    return nextObj;
  }

  get _collisionsAfterDragged() { return _getCollisions(this._objectAfterDragged, this.target); }

  get _hasCollision() { return Object.keys(this.collisions).length !== 0; }
  get _hasCollisionAfterDragged() { return Object.keys(this._collisionsAfterDragged).length !== 0; }
}

const _collision = (objA, objB) => {
  if (objA instanceof Gear && objB instanceof Gear) {
    return Math.trunc(objA.distance(objB)) <= Math.trunc(_calcDistanceThreshold(objA, objB));
  }

  if (objA instanceof Circle && objB instanceof Circle) {
    return Math.trunc(objA.distance(objB)) <= Math.trunc(_calcDistanceThreshold(objA, objB));
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

const _getCollisions = (obj, target) => {
  if (!obj) {
    return {};
  }

  return Object.fromEntries(
      target.filter(t => obj.id !== t.id && _collision(obj, t))
          .map(t => [t.id, t]),
  );
}
