import { RotateDirection } from './constants';

const TEETH_HEIGHT_RATIO = 1.1;

export class Gear {
  radius = 0;
  teethCount = 0;
  color = null;
  direction = RotateDirection.STOP;

  constructor(
      radius,
      teethCount,
      color,
  ) {
    this.radius = radius;
    this.teethCount = teethCount;
    this.color = color;
  }

  diameter() { return this.radius * 2; }

  rotationAngle(frameCount) { return this.direction * (frameCount / 10); }

  arcs(callback) {
    const loopCount = this.teethCount * 2;
    const rad = Math.PI * 2 / loopCount;

    [...Array(loopCount)].forEach((_, i) => {
      const start = Math.PI * 2 * (i / loopCount);

      const radius = this.diameter() * (i % 2 === 0 ? TEETH_HEIGHT_RATIO : 1.0);

      callback({ start, end: start + rad, radius });
    });
  }
}
