import { Gear } from './Gear';
import { RotateDirection } from './constants';

export class GearController {
  p5 = null;
  gear = null;
  color = null;

  constructor(p5, { radius, teethCount, color, translate = { x: 0, y: 0 } }) {
    this.p5 = p5;
    this.gear = new Gear(radius, teethCount, translate);
    this.color = p5.color(color);
  }

  draw() {
    this.gear.rotateLeft();

    this.p5.translate(this.gear.translateX, this.gear.translateY);
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
