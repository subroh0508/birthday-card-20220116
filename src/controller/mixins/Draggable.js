export const Draggable = (P5Controller) => class extends P5Controller {
  draggedObj = null;

  pressedObject(x, y) { this.draggedObj && this.draggedObj.pressed(x, y); }

  dragObject(x, y) { this.draggedObj && this.draggedObj.drag(x, y); }

  releaseObject() {
    this.draggedObj && this.draggedObj.release();
    this.draggedObj = null;
  }

  mousePressed() {
    super.mousePressed();
    this.draggedObj = this.target.slice().reverse().find(t => t.includes(this.mouseX, this.mouseY));
    this.pressedObject(this.mouseX, this.mouseY);
  }

  mouseDragged() {
    super.mouseDragged();
    this.dragObject(this.mouseX, this.mouseY);
  }

  mouseReleased() {
    super.mouseReleased();
    this.releaseObject();
  }
}
