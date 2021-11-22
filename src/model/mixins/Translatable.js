export const Translatable = (Base) => class extends Base {
  translateX = 0;
  translateY = 0;
  pressedX = null;
  pressedY = null;

  constructor(args) {
    super(args);

    const { translate } = args;

    this.translateX = translate && translate.x;
    this.translateY = translate && translate.y;
  }

  get translate() { return { x: this.translateX, y: this.translateY }; }

  move(x, y) {
    this.translateX = x;
    this.translateY = y;
  }

  pressed(mouseX, mouseY) {
    this.pressedX = this.translateX - mouseX;
    this.pressedY = this.translateY - mouseY;
  }
  release() { this.pressedX = this.pressedY = null; }

  get dragged() { return this.pressedX != null && this.pressedY != null; }

  drag(x, y) {
    if (!this.dragged) {
      return;
    }

    this.move(x + this.pressedX, y + this.pressedY);
  }
}
