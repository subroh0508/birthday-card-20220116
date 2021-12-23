export class Layer {
  _order = 0;
  _origin = { x: 0, y: 0 };

  constructor(
    graphics,
    origin = { x: 0, y: 0 },
    order = 0,
  ) {
    this._order = order;
    this._origin = origin;

    Object.setPrototypeOf(Layer.prototype, graphics);
    graphics.translate(this.origin.x, this.origin.y);
  }

  get order() { return this._order; }
  get origin() { return this._origin; }
}
