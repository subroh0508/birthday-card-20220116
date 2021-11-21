import { UmbrellaGearController } from "./UmbrellaGearController";

export class UmbrellaGearsController {
  p5 = null;
  gearControllers = [];

  constructor(p5, gearAttrs) {
    this.p5 = p5;
    this.gearControllers = gearAttrs.map((attr) => new UmbrellaGearController(p5, attr));
  }

  draw() {
    this.gearControllers.forEach((gearController) => {
      gearController.rotateLeft();
      gearController.draw();
    });
  }
}


