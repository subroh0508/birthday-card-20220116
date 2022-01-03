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
  get teethWidth() { return this.diameter * Math.PI / (this.teethCount * 2); }

  get primary() { return '#000000'; }
  get dark() { return '#000000'; }
  get light() { return '#000000'; }

  draw() {
    this.stroke(this.primary);
    this.fill(this.primary);
    this.frame(this.teethWidth, this.teethWidth);

    this.stroke(this.light);
    this.fill(this.light);
    this.ellipse(0, 0, 14);
    this.stroke(this.primary);
    this.fill(this.primary);
    this.ellipse(0, 0, 10);
  }

  frame(startWidth, endWidth) {
    const rad = Math.PI * 2 / this.teethCount;

    this.ellipse(0, 0, this.innerDiameter);
    [...Array(this.teethCount)].forEach(() => {
      this.rotate(rad);
      this.quad(
        this.innerRadius,
        -startWidth / 2,
        this.radius,
        -endWidth / 2,
        this.radius,
        endWidth / 2,
        this.innerRadius,
        startWidth / 2,
      );
    });
  }
}
