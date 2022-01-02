import { Element, Graphics, P2D } from 'p5';

export class Layer {
  _order = 0;
  _origin = { x: 0, y: 0 };

  constructor(
    p5,
    size = { width: 0, height: 0 },
    origin = { x: 0, y: 0 },
    order = 0,
  ) {
    this._order = order;
    this._origin = origin;

    Object.setPrototypeOf(Layer.prototype, Object.create(Element.prototype));
    Graphics.bind(this)(size.width, size.height, P2D, p5);
  }

  get order() { return this._order; }
  get origin() { return this._origin; }

  draw() {}

  setup() {
    this.translate(this.origin.x, this.origin.y);
    this.draw();
  }
}
