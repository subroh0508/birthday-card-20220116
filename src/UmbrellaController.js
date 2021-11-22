import { Umbrella } from './Umbrella';

export class UmbrellaController {
  p5 = null;
  umbrella = null;

  constructor(p5, { radius, boneCount, translate = { x: 0, y: 0 } }) {
    this.p5 = p5;
    this.umbrella = new Umbrella(radius, boneCount, translate);
  }

  draw() {
    this.umbrella.rotateLeft();

    this.p5.translate(this.umbrella.translateX, this.umbrella.translateY);
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


