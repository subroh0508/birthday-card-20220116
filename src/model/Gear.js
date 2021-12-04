import { Circle } from './abstract/Circle';

const INNER_RADIUS_RATIO = 0.9;

export class Gear extends Circle {
  teethCount = 0;

  constructor(p5, args) {
    super(p5, args);

    this.teethCount = args.teethCount;
  }

  get innerRadius() { return this.radius * INNER_RADIUS_RATIO; }
  get teethHeight() { return this.radius * (1 - INNER_RADIUS_RATIO); }

  minDistance(model) {
    if (model instanceof Gear) {
      return this.innerRadius + model.innerRadius + (this.teethHeight + model.teethHeight) / 2;
    }

    return super.minDistance(model);
  }

  drawBlock() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);

    this.stroke(this.backgroundColor);
    _arcs(this.diameter(), this.teethCount, ({ start, end, radius }) => {
      this.fill(this.backgroundColor);
      this.arc(0, 0, radius, radius, start, end, this.PIE);
    });

    this.fill(255);
    this.ellipse(0, 0, 10);
  }
}

const _arcs = (diameter, teethCount, callback) => {
  const loopCount = teethCount * 2;
  const rad = Math.PI * 2 / loopCount;

  [...Array(loopCount)].forEach((_, i) => {
    const start = Math.PI * 2 * (i / loopCount);

    const radius = diameter * (i % 2 === 0 ? INNER_RADIUS_RATIO : 1.0);

    callback({ start, end: start + rad, radius });
  });
}
