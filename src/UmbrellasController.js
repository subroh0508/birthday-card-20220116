import { UmbrellaController } from './UmbrellaController';

export class UmbrellasController {
  p5 = null;
  gearControllers = [];

  constructor(p5, gearAttrs) {
    this.p5 = p5;
    this.gearControllers = gearAttrs.map((attr) => new UmbrellaController(p5, attr));
  }

  draw() {
    this.gearControllers.forEach((gearController) => {
      gearController.rotateLeft();
      gearController.draw();
    });
  }
}


