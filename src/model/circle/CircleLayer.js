import { Layer } from '../abstract/Layer';

export class CircleLayer extends Layer {
  _radius = 0;

  constructor(p5, radius, order) {
    super(
      p5,
      { width: radius * 2, height: radius * 2 },
      { x: radius, y: radius },
      order,
    );

    this._radius = radius || 0;
  }

  get radius() { return this._radius; }
  get diameter() { return this.radius * 2; }

  draw() { this.ellipse(0, 0, this.diameter); }
}