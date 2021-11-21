export const RotateDirection = { RIGHT: -1, STOP: 0, LEFT: 1 };
Object.freeze(RotateDirection);

const TEETH_HEIGHT_RATIO = 1.025;

export class UmbrellaGear {
  radius = 0;
  teethCount = 0;
  direction = RotateDirection.STOP; // (-1, 0, 1) = (right, stop, left)

  constructor(
      radius,
      teethCount,
  ) {
    this.radius = radius;
    this.teethCount = teethCount;
  }

  set direction(direction) { this.direction = direction; }

  diameter() { return this.radius * 2; }

  rotationAngle(frameCount) { return this.direction * (frameCount / 10); }

  teethPoints(callback) {
    [...Array(this.teethCount)].forEach((_, i) => {
      const x1 = Math.cos(Math.PI * 2 * (i / this.teethCount)) * this.radius * TEETH_HEIGHT_RATIO;
      const y1 = Math.sin(Math.PI * 2 * (i / this.teethCount)) * this.radius * TEETH_HEIGHT_RATIO;

      callback({ x1, y1, x2: 0, y2: 0 });
    });
  }
}


