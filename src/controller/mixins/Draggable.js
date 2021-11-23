export const Draggable = (P5Controller) => class extends P5Controller {
  draggedObj = null;

  mousePressed() {
    super.mousePressed();
    this.draggedObj = this.target.slice().reverse().find(t => t.includes(this.mouseX, this.mouseY));
    this.draggedObj && this.draggedObj.pressed(this.mouseX, this.mouseY);
  }

  mouseDragged() {
    super.mouseDragged();
    this.draggedObj && this.draggedObj.drag(this.mouseX, this.mouseY);
  }

  mouseReleased() {
    super.mouseReleased();
    this.draggedObj && this.draggedObj.release();
    this.draggedObj = null;
  }
}
