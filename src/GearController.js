import { Gear } from './Gear';
import { RotateDirection } from './constants';

export class GearController {
  p5 = null;
  gear = null;
  color = null;
  translateX = 0;
  translateY = 0;

  constructor(p5, { radius, teethCount, color, translate = { x: 0, y: 0 } }) {
    this.p5 = p5;
    this.gear = new Gear(radius, teethCount);
    this.color = p5.color(color);
    this.translateX = translate.x;
    this.translateY = translate.y;
  }

  set direction(direction) { this.gear.direction = direction; }

  rotateLeft() { this.direction = RotateDirection.LEFT; }
  rotateRight() { this.direction = RotateDirection.RIGHT; }
  stopRotation() { this.direction = RotateDirection.STOP; }

  set translate({ x, y }) {
    this.translateX = x;
    this.translateY = y;
  }

  draw() {
    this.p5.translate(this.translateX, this.translateY);
    this.p5.rotate(this.gear.rotationAngle(this.p5.frameCount));

    this.p5.stroke(this.color);
    this.gear.arcs(({ start, end, radius }) => {
      this.p5.fill(this.color);
      this.p5.arc(0, 0, radius, radius, start, end, this.p5.PIE);
    });

    this.p5.fill(255);
    this.p5.ellipse(0, 0, 10);
  }
}
