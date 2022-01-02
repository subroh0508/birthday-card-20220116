import { CircleLayer } from '../circle/CircleLayer';

const TEETH_HEIGHT_RATIO = 1.025;

export class UmbrellaLayer extends CircleLayer {
  _boneCount = 0;
  _boneColor = '#000000';
  _coverColor = '#FFFFFF';

  constructor(p5, radius, boneCount, color, order) {
    super(p5, radius, order);

    this._boneCount = boneCount || 0
    this._boneColor = (color && color.bone) || this._boneColor;
    this._coverColor = (color && color.cover) || this._coverColor;
  }

  get boneCount() { return this._boneCount; }
  get boneColor() { return this._boneColor; }
  get coverColor() { return this._coverColor; }

  draw() {
    this.stroke(this.coverColor);
    _covers(this.radius, this.boneCount, ({ x1, y1, x2, y2, x3, y3 }) => {
      this.fill(this.coverColor);
      this.triangle(x1, y1, x2, y2, x3, y3);
    });

    this.strokeWeight(2);
    this.stroke(this.boneColor);
    _bones(this.radius, this.boneCount, ({ x1, y1, x2, y2 }) => {
      this.line(x1, y1, x2, y2);
    });

    this.fill(255);
    this.circle(0, 0, 10);
  }
}

const _bones = (radius, boneCount, callback) => {
  [...Array(boneCount)].forEach((_, i) => {
    const x1 = Math.cos(Math.PI * 2 * (i / boneCount)) * radius * TEETH_HEIGHT_RATIO;
    const y1 = Math.sin(Math.PI * 2 * (i / boneCount)) * radius * TEETH_HEIGHT_RATIO;

    callback({ x1, y1, x2: 0, y2: 0 });
  });
}

const _covers = (radius, boneCount, callback) => {
  const rad = Math.PI * 2 / boneCount;

  [...Array(boneCount)].forEach((_, i) => {
    const x2 = Math.cos(rad * i) * radius;
    const y2 = Math.sin(rad * i) * radius;
    const x3 = Math.cos(rad * (i + 1)) * radius;
    const y3 = Math.sin(rad * (i + 1)) * radius;

    callback({ x1: 0, y1: 0, x2, y2, x3, y3 });
  });
}
