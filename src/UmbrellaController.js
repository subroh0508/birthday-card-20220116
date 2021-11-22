import { RotateDirection } from './constants';
import { Umbrella } from './Umbrella';

export class UmbrellaController {
  p5 = null;
  umbrella = null;
  translateX = 0;
  translateY = 0;

  constructor(p5, { radius, boneCount, translate = { x: 0, y: 0 } }) {
    this.p5 = p5;
    this.umbrella = new Umbrella(radius, boneCount);
    this.translateX = translate.x;
    this.translateY = translate.y;
  }

  get direction() { return this.umbrella.direction; }
  set direction(direction) { this.umbrella.direction = direction; }

  left() { this.direction = RotateDirection.LEFT; }
  right() { this.direction = RotateDirection.RIGHT; }
  stop() { this.direction = RotateDirection.STOP; }
  isStopped() { return this.direction === RotateDirection.STOP; }

  set translate({ x, y }) {
    this.translateX = x;
    this.translateY = y;
  }

  draw() {
    this.p5.translate(this.translateX, this.translateY);
    this.p5.rotate(this.umbrella.rotationAngle(this.p5.frameCount));

    this.p5.stroke(255);
    this.umbrella.covers(({ x1, y1, x2, y2, x3, y3 }) => {
      this.p5.fill(255);
      this.p5.triangle(x1, y1, x2, y2, x3, y3);
    });

    this.p5.strokeWeight(2);
    this.p5.stroke(0);
    this.umbrella.bones(({ x1, y1, x2, y2 }) => {
      this.p5.line(x1, y1, x2, y2);
    });

    this.p5.fill(255);
    this.p5.circle(0, 0, 10);
  }
}


