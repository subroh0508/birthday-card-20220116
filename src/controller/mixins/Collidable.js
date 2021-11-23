import { Gear } from '../../model/Gear';
import { Circle } from '../../model/abstract/Circle';
import { Draggable } from './Draggable';

export const Collidable = (P5Controller) => class extends Draggable(P5Controller) {
  collision(objA, objB) {
    if (objA instanceof Gear && objB instanceof Gear) {
      return objA.distance(objB) <= objA.innerRadius + objB.innerRadius + (objA.teethHeight + objB.teethHeight) / 2;
    }

    if (objA instanceof Circle && objB instanceof Circle) {
      return objA.distance(objB) <= objA.radius + objB.radius;
    }

    return false;
  }

  get collisions() {
    if (!this.draggedObj) {
      return [];
    }

    return Object.fromEntries(
        this.target
            .filter(t => this.draggedObj.id !== t.id && this.collision(this.draggedObj, t))
            .map(t => [t.id, t]),
    );
  }

  mouseDragged() {
    if (this._hasCollision && this._hasCollisionAfterDragged) {
      return;
    }

    super.mouseDragged();
  }

  get _objectAfterDragged() {
    if (!this.draggedObj) {
      return null;
    }

    const nextObj = Object.create(this.draggedObj);
    nextObj.drag(this.mouseX, this.mouseY);

    return nextObj;
  }

  get _hasCollision() {
    if (!this.draggedObj) {
      return false;
    }

    return this.target.some(t => this.draggedObj.id !== t.id && this.collision(this.draggedObj, t));
  }

  get _hasCollisionAfterDragged() {
    const afterDragged = this._objectAfterDragged;
    if (!afterDragged) {
      return false;
    }

    return this.target.some(t => afterDragged.id !== t.id && this.collision(afterDragged, t));
  }
}
