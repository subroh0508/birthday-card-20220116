import { RotateDirection } from './constants';
import { Umbrella } from './Umbrella';

export class UmbrellaController {
  p5 = null;
  gear = null;

  constructor(p5, { radius, boneCount }) {
    this.p5 = p5;
    this.gear = new Umbrella(radius, boneCount);
  }

  rotateLeft() { this.startRotation(RotateDirection.LEFT); }
  rotateRight() { this.startRotation(RotateDirection.RIGHT); }
  stopRotation() { this.startRotation(RotateDirection.STOP); }

  startRotation(direction) {
    this.gear.direction = direction;
    this.p5.rotate(this.gear.rotationAngle(this.p5.frameCount));
  }

  draw() {
    this.p5.stroke(255);
    this.gear.covers(({ x1, y1, x2, y2, x3, y3 }) => {
      this.p5.fill(255);
      this.p5.triangle(x1, y1, x2, y2, x3, y3);
    });

    this.p5.strokeWeight(2);
    this.p5.stroke(0);
    this.gear.bones(({ x1, y1, x2, y2 }) => {
      this.p5.line(x1, y1, x2, y2);
    });

    this.p5.fill(255);
    this.p5.circle(0, 0, 10);
  }
}


