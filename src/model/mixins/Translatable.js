export const Translatable = (Base) => class extends Base {
  translateX = 0;
  translateY = 0;
  dragged = false;

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

  pressed() { this.dragged = true; }
  released() { this.dragged = false; }

  drag(x, y) {
    if (!this.dragged) {
      return;
    }

    this.move(x, y);
  }
}
