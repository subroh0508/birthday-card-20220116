export const Draggable = (P5Controller) => class extends P5Controller {
  draggedObj = null;

  mousePressed() {
    this.draggedObj = this.target.slice().reverse().find(t => t.isPressed(this.mouseX, this.mouseY));
    this.draggedObj && this.draggedObj.pressed(this.mouseX, this.mouseY);
  }

  mouseDragged() {
    this.draggedObj && this.draggedObj.drag(this.mouseX, this.mouseY);
  }

  mouseReleased() {
    this.draggedObj && this.draggedObj.release();
  }
}
