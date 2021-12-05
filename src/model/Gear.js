import { Circle } from './abstract/Circle';

const INNER_RADIUS_RATIO = 0.9;

export class Gear extends Circle {
  teethCount = 0;
  _initRadian = 0;

  constructor(p5, args) {
    super(p5, args);

    this.teethCount = args.teethCount;
    this._initRadian = args.initRadian || 0;
  }

  get innerRadius() { return this.radius * INNER_RADIUS_RATIO; }
  get teethHeight() { return this.radius * (1 - INNER_RADIUS_RATIO); }

  minDistance(model) {
    if (model instanceof Gear) {
      return this.innerRadius + model.innerRadius + (this.teethHeight + model.teethHeight) / 2;
    }

    return super.minDistance(model);
  }

  drawBlock(g) {
    this._drawBlock(
      g,
      this.rotationAngle,
      this.backgroundColor,
    );
  }

  _drawBlock(
    g,
    rotationAngle,
    backgroundColor,
  ) {
    g.stroke(backgroundColor);
    this.arcs(({ start, end, radius }) => {
      g.fill(backgroundColor);
      g.arc(0, 0, radius, radius, start, end, g.PIE);
    });

    g.fill(255);
    g.ellipse(0, 0, 10);
  }

  arcs(callback) { _arcs(this._initRadian, this.diameter(), this.teethCount, callback) }
}

const _arcs = (initRadian, diameter, teethCount, callback) => {
  const loopCount = teethCount * 2;
  const rad = Math.PI * 2 / loopCount;

  [...Array(loopCount)].forEach((_, i) => {
    const start = Math.PI * 2 * (i / loopCount) + initRadian;

    const radius = diameter * (i % 2 === 0 ? INNER_RADIUS_RATIO : 1.0);

    callback({ start, end: start + rad, radius });
  });
}
