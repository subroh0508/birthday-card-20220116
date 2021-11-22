export const Translatable = (Base) => class extends Base {
  translateX = 0;
  translateY = 0;

  constructor(args) {
    super(args);

    const { translate } = args;

    this.translateX = translate && translate.x;
    this.translateY = translate && translate.y;
  }

  get translate() { return { x: this.translateX, y: this.translateY } }
}
