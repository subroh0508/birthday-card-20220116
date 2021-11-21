import { UmbrellaController } from './UmbrellaController';

export class UmbrellasController {
  p5 = null;
  umbrellaControllers = [];

  constructor(p5, umbrellaAttrs) {
    this.p5 = p5;
    this.umbrellaControllers = umbrellaAttrs.map((attr) => new UmbrellaController(p5, attr));
  }

  draw() {
    this.umbrellaControllers.forEach((umbrellaController) => {
      this.p5.push();
      umbrellaController.rotateLeft();
      umbrellaController.draw();
      this.p5.pop();
    });
  }
}
