import { CircleLayer } from '../circle/CircleLayer';

const INNER_RADIUS_RATIO = 0.9;

export class GearLayer extends CircleLayer {
  _teethHeight = 0;
  _teethCount = 0;

  constructor(p5, radius, teethHeight, teethCount, order) {
    super(p5, radius, order);

    this._teethHeight = teethHeight || this.radius * (1 - INNER_RADIUS_RATIO);
    this._teethCount = teethCount || 0;
  }

  get teethHeight() { return this._teethHeight; }
  get teethCount() { return this._teethCount; }
  get innerRadius() { return this.radius - this.teethHeight; }
  get innerDiameter() { return this.innerRadius * 2; }

  draw() {
    this.stroke(0);
    this.fill(0);
    arcs(
      this.radius * 2,
      this.innerRadius * 2,
      this.teethCount,
      ({ start, end, radius }) => {
        this.arc(0, 0, radius, radius, start, end, this.PIE);
      },
    );

    this.fill(255);
    this.ellipse(0, 0, 10);
  }
}

export const arcs = (diameter, innerDiameter, teethCount, callback) => {
  const loopCount = teethCount * 2;
  const rad = Math.PI * 2 / loopCount;

  [...Array(loopCount)].reduce((start, _, i) => {
    const radius = i % 2 === 0 ? innerDiameter : diameter;

    callback({ start, end: start + rad, radius });

    return start + rad;
  }, 0);
};
