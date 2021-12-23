export class Layer {
  _order = 0;

  constructor(p5, { width, height, order }) {
    Object.setPrototypeOf(
      Layer.prototype,
      p5.createGraphics(width, height),
    );

    this._order = order;
  }

  get order() { return this._order; }
}
