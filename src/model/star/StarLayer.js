import { P5Layer } from '../abstract/P5Layer';

const MAX_WAIT_FRAME = 50;
const MIN_WAIT_FRAME = 5;

const MAX_SIZE = 225;
const MIN_SIZE = 25;

export class StarLayer extends P5Layer {
  _color = '#FFFFFF';
  _size = 0;
  _diff = 0;
  _waitFrames = 0;

  constructor(p5, color, order) {
    super(
      p5,
      { width: MAX_SIZE, height: MAX_SIZE },
      { x: MAX_SIZE / 2, y: MAX_SIZE / 2 },
      order,
    );

    this._color = color;
    this._recalculate();
  }

  get fillColor() { return this._color; }
  get size() { return this._size; }
  get diff() { return this._diff; }
  get waitFrames() { return this._waitFrames };

  draw(hasPower) {
    this.clear();
    if (!hasPower) {
      return;
    }

    if (this.waitFrames >= 0) {
      this._wait();
      return;
    }

    this.fill(this.fillColor);
    this.noStroke();

    if (this.size <= 0) {
      this._recalculate();
      return;
    }

    this._darken();
    const centerSize = Math.sqrt(this.size);

    this.ellipse(0, 0, centerSize);
    this.erase(50);
    this.ellipse(0, 0, centerSize);
    this.noErase();
    _calcTrianglePoints(centerSize, this.size).forEach(p =>{
      this.triangle(...p);
      this.erase(50);
      this.triangle(...p);
      this.noErase();
    });
  }

  _wait() { this._waitFrames -= 1; }
  _darken() { this._size -= this.diff; }

  _recalculate() {
    this._size = _calcSize();
    this._diff = this.size / 10;
    this._waitFrames = _calcWaitFrame();
  }
}

const _calcSize = () => Math.trunc(Math.random() * (MAX_SIZE - MIN_SIZE + 1) + MIN_SIZE);
const _calcWaitFrame = () => Math.trunc(Math.random() * (MAX_WAIT_FRAME - MIN_WAIT_FRAME + 1) + MIN_WAIT_FRAME);

const _calcTrianglePoints = (centerSize, size) => {
  const a = Math.sqrt(centerSize / 2);
  const b = size / 2 - a;

  return [
    [-a, -a, 0, -b, a, -a],
    [a, -a, b, 0, a, a],
    [a, a, 0, b, -a, a],
    [-a, a, -b, 0, -a, -a],
  ];
}
