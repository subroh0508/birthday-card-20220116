import { TWO_PI } from 'p5';
import { UmbrellaGear, RotateDirection } from './UmbrellaGear';

export class UmbrellaGearController {
  p5 = null;
  gear = null;

  constructor(p5, { radius, teethCount }) {
    this.p5 = p5;
    this.gear = new UmbrellaGear(radius, teethCount);
  }

  rotateLeft() { this.startRotation(RotateDirection.LEFT); }
  rotateRight() { this.startRotation(RotateDirection.RIGHT); }
  stopRotation() { this.startRotation(RotateDirection.STOP); }

  startRotation(direction) {
    this.gear.direction = direction;
    this.p5.rotate(this.gear.rotationAngle(this.p5.frameCount));
  }

  draw() {
    this.p5.fill(0, 0, 0);
    this.p5.circle(0, 0, this.gear.diameter());

    this.p5.strokeWeight(2);
    this.p5.stroke(255);

    this.gear.teethPoints(({ x1, y1, x2, y2 }) => {
      this.p5.line(x1, y1, x2, y2);
    });

    this.p5.fill(255);
    this.p5.circle(0, 0, 10);
  }
}


