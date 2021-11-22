import { P5Controller } from './controller/P5Controller';
import { Gear } from './Gear';
import { Umbrella } from './Umbrella';

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

    this.gears = gears.map((gear) => new Gear(p5, gear));
    this.umbrellas = umbrellas.map((umbrella) => new Umbrella(p5, umbrella));
  }

  get objects() {
    return [
      ...this.gears,
      ...this.umbrellas,
    ];
  }

  draw() { this.objects.forEach((obj) => obj.draw()); }

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
