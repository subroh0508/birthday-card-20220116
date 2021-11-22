export const RotateDirection = { RIGHT: -1, STOP: 0, LEFT: 1 };

export const Rotatable = (Base) => class extends Base {
  direction = RotateDirection.STOP;

  rotationAngle(frameCount) { return this.direction * (frameCount / 10); }
}
