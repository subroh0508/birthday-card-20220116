export const RotateDirection = { RIGHT: -1, STOP: 0, LEFT: 1 };

export const Rotatable = (Base) => class extends Base {
  direction = RotateDirection.STOP;

  constructor(args) {
    super(args);

    const { direction } = args;
    this.direction = direction || RotateDirection.STOP;
  }

  get direction() { return this.direction; }
  set direction(direction) { this.direction = direction; }

  rotateLeft() { this.direction = RotateDirection.LEFT; }
  rotateRight() { this.direction = RotateDirection.RIGHT; }
  rotateStop() { this.direction = RotateDirection.STOP; }
  isStopped() { return this.direction === RotateDirection.STOP; }

  rotationAngle(frameCount) { return this.direction * (frameCount / 10); }
}
