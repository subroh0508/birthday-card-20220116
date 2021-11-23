export const RotateDirection = { RIGHT: -1, STOP: 0, LEFT: 1 };

Object.freeze(RotateDirection);

export const Rotatable = (P5Model) => class extends P5Model {
  _direction = RotateDirection.STOP;
  _hasPower = false;

  constructor(p5, args) {
    super(p5, args);

    const { direction } = args;
    this._direction = direction || RotateDirection.STOP;
    this._hasPower = !!direction;
  }

  get direction() { return this._direction; }
  set direction(direction) {
    if (this.hasPower) {
      return;
    }

    this._direction = direction;
  }

  get hasPower() { return this._hasPower; }

  rotateLeft() { this.direction = RotateDirection.LEFT; }
  rotateRight() { this.direction = RotateDirection.RIGHT; }
  rotateStop() { this.direction = RotateDirection.STOP; }
  isStopped() { return this._direction === RotateDirection.STOP; }

  get rotationAngle() { return this._direction * (this.frameCount / 10); }
}
