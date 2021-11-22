import { Umbrella } from './Umbrella';
import { P5Controller } from './controller/P5Controller';

export class UmbrellaController extends P5Controller {
  umbrella = null;

  constructor(p5, { radius, boneCount, translate = { x: 0, y: 0 } }) {
    super({ p5 });

    this.umbrella = new Umbrella(radius, boneCount, translate);
  }

  draw() {
    this.push();
    this.umbrella.rotateLeft();

    this.translate(this.umbrella.translateX, this.umbrella.translateY);
    this.rotate(this.umbrella.rotationAngle(this.frameCount));

    this.stroke(255);
    this.umbrella.covers(({ x1, y1, x2, y2, x3, y3 }) => {
      this.fill(255);
      this.triangle(x1, y1, x2, y2, x3, y3);
    });

    this.strokeWeight(2);
    this.stroke(0);
    this.umbrella.bones(({ x1, y1, x2, y2 }) => {
      this.line(x1, y1, x2, y2);
    });

    this.fill(255);
    this.circle(0, 0, 10);
    this.pop();
  }
}


