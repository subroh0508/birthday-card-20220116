import { RotateDirection } from './constants';

const INNER_RADIUS_RATIO = 0.9;

export class Gear {
  radius = 0;
  teethCount = 0;
  direction = RotateDirection.STOP;

  constructor(
    radius,
    teethCount,
  ) {
    this.radius = radius;
    this.teethCount = teethCount;
  }

  diameter() { return this.radius * 2; }

  rotationAngle(frameCount) { return this.direction * (frameCount / 10); }

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
