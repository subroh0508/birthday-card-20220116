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

  left() { this.direction = RotateDirection.LEFT; }
  right() { this.direction = RotateDirection.RIGHT; }
  stop() { this.direction = RotateDirection.STOP; }
  isStopped() { return this.direction === RotateDirection.STOP; }

  rotationAngle(frameCount) { return this.direction * (frameCount / 10); }
}
