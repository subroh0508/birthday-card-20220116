export class Layer {
  _order = 0;
  _origin = { x: 0, y: 0 };

  constructor(p5, { width, height }, origin = { x: 0, y: 0 }, order = 0) {
    this._order = order;
    this._origin = origin;

    const graphics = p5.createGraphics(width, height);
    graphics.translate(this.origin.x, this.origin.y)

    Object.setPrototypeOf(Layer.prototype, graphics);
  }

  get order() { return this._order; }
  get origin() { return this._origin; }
}
