import { Circle } from "./model/Circle";

const INNER_RADIUS_RATIO = 0.9;

export class Gear extends Circle {
  teethCount = 0;

  constructor(
    radius,
    teethCount,
    translate = { x: 0, y: 0 },
  ) {
    super({ radius, translate });

    this.teethCount = teethCount;
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
