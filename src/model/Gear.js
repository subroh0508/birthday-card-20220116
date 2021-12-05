import { Circle } from './abstract/Circle';

const INNER_RADIUS_RATIO = 0.9;

export class Gear extends Circle {
  teethCount = 0;
  _teethHeight = 0;
  _teethWidthRatio = 1.0;
  _initRadian = 0;

  constructor(p5, args) {
    super(p5, args);

    this.teethCount = args.teethCount;
    this._teethHeight = args.teethHeight || (this.radius * (1 - INNER_RADIUS_RATIO));
    this._teethWidthRatio = args.teethWidthRatio || 1.0;
    this._initRadian = args.initRadian || 0;
  }

  get innerRadius() { return this.radius - this.teethHeight; }
  get innerDiameter() { return this.innerRadius * 2; }
  get teethHeight() { return this._teethHeight; }

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

  arcs(callback) {
    _arcs(
      this._initRadian,
      this.diameter(),
      this.innerDiameter,
      this.teethCount,
      this._teethWidthRatio,
      callback,
    );
  }
}

const _arcs = (initRadian, diameter, innerDiameter, teethCount, teethWidthRatio, callback) => {
  const loopCount = teethCount * 2;
  const rad = Math.PI * 2 / loopCount;

  [...Array(loopCount)].reduce((start, _, i) => {
    const radius = i % 2 === 0 ? innerDiameter : diameter;
    const diff = rad * (i % 2 === 0 ? (2.0 - teethWidthRatio) : teethWidthRatio);

    callback({ start, end: start + diff, radius });

    return start + diff;
  }, initRadian);
}
