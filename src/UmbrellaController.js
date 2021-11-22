import { Umbrella } from './Umbrella';
import { P5Controller } from './controller/P5Controller';

export class UmbrellaController extends P5Controller {
  constructor(p5, { radius, boneCount, translate = { x: 0, y: 0 } }) {
    super({ p5, target: new Umbrella(radius, boneCount, translate) });
  }

  draw() {
    this.push();
    this.target.rotateLeft();

    this.translate(this.target.translateX, this.target.translateY);
    this.rotate(this.target.rotationAngle(this.frameCount));

    this.stroke(255);
    this.target.covers(({ x1, y1, x2, y2, x3, y3 }) => {
      this.fill(255);
      this.triangle(x1, y1, x2, y2, x3, y3);
    });

    this.strokeWeight(2);
    this.stroke(0);
    this.target.bones(({ x1, y1, x2, y2 }) => {
      this.line(x1, y1, x2, y2);
    });

    this.fill(255);
    this.circle(0, 0, 10);
    this.pop();
  }
}


