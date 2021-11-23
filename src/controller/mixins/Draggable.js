import { Collidable } from './Collidable';

export const Draggable = (P5Controller) => class extends Collidable(P5Controller) {
  draggedObj = null;

  mousePressed() {
    super.mousePressed();
    this.draggedObj = this.target.slice().reverse().find(t => t.includes(this.mouseX, this.mouseY));
    this.draggedObj && this.draggedObj.pressed(this.mouseX, this.mouseY);
  }

  mouseDragged() {
    super.mouseDragged();

    if (!this.draggedObj || this.collision(this._nextObj())) {
      return;
    }

    this.draggedObj.drag(this.mouseX, this.mouseY);
  }

  mouseReleased() {
    super.mouseReleased();
    this.draggedObj && this.draggedObj.release();
    this.draggedObj = null;
  }

  _nextObj() {
    const obj = Object.create(this.draggedObj);
    obj.drag(this.mouseX, this.mouseY);

    return obj;
  }
}
