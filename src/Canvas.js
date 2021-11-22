import { P5Controller } from './controller/P5Controller';
import { GearController } from './GearController';
import { UmbrellaController } from './UmbrellaController';

export class Canvas extends P5Controller {
  gears = [];
  umbrellas = [];
  draggedObj = null;

  constructor(
    p5,
    gears = [],
    umbrellas = [],
  ) {
    super({ p5, target: null });

    this.gears = gears.map((gear) => new GearController(p5, gear));
    this.umbrellas = umbrellas.map((umbrella) => new UmbrellaController(p5, umbrella));
  }

  get controllers() {
    return [
      ...this.gears,
      ...this.umbrellas,
    ];
  }

  get objects() {
    return this.controllers.map((gear) => gear.target);
  }

  draw() { this.controllers.forEach((gear) => gear.draw()); }

  mousePressed() {
    console.log(`mouse = (${this.mouseX}, ${this.mouseY})`);
    this.draggedObj = this.objects.find(obj => obj.isPressed(this.mouseX, this.mouseY));
    this.draggedObj && this.draggedObj.pressed(this.mouseX, this.mouseY);
  }

  mouseDragged() {
    this.draggedObj && this.draggedObj.drag(this.mouseX, this.mouseY);
  }

  mouseReleased() {
    this.draggedObj && this.draggedObj.release();
  }
}
