import { Circle } from './abstract/Circle';

const INNER_RADIUS_RATIO = 0.9;

export class Gear extends Circle {
  teethCount = 0;

  constructor(p5, args) {
    super(p5, args);

    this.teethCount = args.teethCount;
  }

  drawBlock() {
    this.rotateLeft();

    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);

    this.stroke(this.backgroundColor);
    this.arcs(({ start, end, radius }) => {
      this.fill(this.backgroundColor);
      this.arc(0, 0, radius, radius, start, end, this.PIE);
    });

    this.fill(255);
    this.ellipse(0, 0, 10);
  }

  arcs(callback) {
    const loopCount = this.teethCount * 2;
    const rad = Math.PI * 2 / loopCount;

    [...Array(loopCount)].forEach((_, i) => {
      const start = Math.PI * 2 * (i / loopCount);

      const radius = this.diameter() * (i % 2 === 0 ? INNER_RADIUS_RATIO : 1.0);

      callback({ start, end: start + rad, radius });
    });
  }
}
