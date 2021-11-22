import { Circle } from "./model/Circle";

const TEETH_HEIGHT_RATIO = 1.025;

export class Umbrella extends Circle {
  boneCount = 0;

  constructor(
    radius,
    teethCount,
    translate = { x: 0, y: 0 },
  ) {
    super({ radius, translate });

    this.boneCount = teethCount;
  }

  bones(callback) {
    [...Array(this.boneCount)].forEach((_, i) => {
      const x1 = Math.cos(Math.PI * 2 * (i / this.boneCount)) * this.radius * TEETH_HEIGHT_RATIO;
      const y1 = Math.sin(Math.PI * 2 * (i / this.boneCount)) * this.radius * TEETH_HEIGHT_RATIO;

      callback({ x1, y1, x2: 0, y2: 0 });
    });
  }

  covers(callback) {
    const rad = Math.PI * 2 / this.boneCount;

    [...Array(this.boneCount)].forEach((_, i) => {
      const x2 = Math.cos(rad * i) * this.radius;
      const y2 = Math.sin(rad * i) * this.radius;
      const x3 = Math.cos(rad * (i + 1)) * this.radius;
      const y3 = Math.sin(rad * (i + 1)) * this.radius;

      callback({ x1: 0, y1: 0, x2, y2, x3, y3 });
    });
  }
}


