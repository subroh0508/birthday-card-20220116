import { Gear } from './Gear';
import { P5Controller } from './controller/P5Controller';

export class GearController extends P5Controller {
  color = null;

  constructor(p5, { radius, teethCount, color, translate = { x: 0, y: 0 } }) {
    super({ p5, target: new Gear(radius, teethCount, translate) });

    this.color = p5.color(color);
  }

  draw() {
    this.push();
    this.target.rotateLeft();

    this.translate(this.target.translateX, this.target.translateY);
    this.rotate(this.target.rotationAngle(this.frameCount));

    this.stroke(this.color);
    this.target.arcs(({ start, end, radius }) => {
      this.fill(this.color);
      this.arc(0, 0, radius, radius, start, end, this.PIE);
    });

    this.fill(255);
    this.ellipse(0, 0, 10);
    this.pop();
  }
}
