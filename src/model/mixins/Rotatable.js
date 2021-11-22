export const RotateDirection = { RIGHT: -1, STOP: 0, LEFT: 1 };

Object.freeze(RotateDirection);

export const Rotatable = (P5Model) => class extends P5Model {
  direction = RotateDirection.STOP;

  constructor(p5, args) {
    super(p5, args);

    const { direction } = args;
    this.direction = direction || RotateDirection.STOP;
  }

  get direction() { return this.direction; }
  set direction(direction) { this.direction = direction; }

  rotateLeft() { this.direction = RotateDirection.LEFT; }
  rotateRight() { this.direction = RotateDirection.RIGHT; }
  rotateStop() { this.direction = RotateDirection.STOP; }
  isStopped() { return this.direction === RotateDirection.STOP; }

  get rotationAngle() { return this.direction * (this.frameCount / 10); }
}
