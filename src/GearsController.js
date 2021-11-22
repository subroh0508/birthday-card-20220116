import { GearController } from './GearController';

export class GearsController {
  p5 = null;
  gearControllers = [];

  constructor(p5, gearAttrs) {
    this.p5 = p5;
    this.gearControllers = gearAttrs.map((attr) => new GearController(p5, attr));
  }

  draw() {
    this.gearControllers.forEach((gearController) => {
      this.p5.push();
      gearController.draw();
      this.p5.pop();
    });
  }
}
