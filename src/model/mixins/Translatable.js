export const Translatable = (P5Model) => class extends P5Model {
  translateX = 0;
  translateY = 0;
  pressedX = null;
  pressedY = null;

  constructor(p5, args) {
    super(p5, args);

    const { translate } = args;

    this.translateX = translate && translate.x;
    this.translateY = translate && translate.y;
  }

  move(x, y) {
    this.translateX = x;
    this.translateY = y;
  }

  pressed(mouseX, mouseY) {
    this.pressedX = mouseX - this.translateX;
    this.pressedY = mouseY - this.translateY;
  }
  release() { this.pressedX = this.pressedY = null; }

  get dragged() { return this.pressedX != null && this.pressedY != null; }

  drag(x, y) {
    if (!this.dragged) {
      return;
    }

    this.move(x - this.pressedX, y - this.pressedY);
  }
}
