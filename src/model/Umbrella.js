import { Circle } from './abstract/Circle';

const TEETH_HEIGHT_RATIO = 1.025;

export class Umbrella extends Circle {
  boneCount = 0;

  constructor(p5, args) {
    super(p5, args);

    this.boneCount = args.boneCount;
  }

  drawBlock(g) {
    this._drawBlock(
      g,
      this.radius,
      this.boneCount,
      this.rotationAngle,
      this.backgroundColor,
    );
  }

  _drawBlock(
    g,
    radius,
    boneCount,
    rotationAngle,
    backgroundColor,
  ) {
    g.stroke(backgroundColor);
    _covers(radius, boneCount, ({ x1, y1, x2, y2, x3, y3 }) => {
      g.fill(backgroundColor);
      g.triangle(x1, y1, x2, y2, x3, y3);
    });

    g.strokeWeight(2);
    g.stroke(0);
    _bones(radius, boneCount, ({ x1, y1, x2, y2 }) => {
      g.line(x1, y1, x2, y2);
    });

    g.fill(255);
    g.circle(0, 0, 10);
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
