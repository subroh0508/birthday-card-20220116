import { P5Controller } from './controller/P5Controller';
import { Gear } from './model/Gear';
import { Umbrella } from './model/Umbrella';

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

  get target() {
    return [
      ...this.gears,
      ...this.umbrellas,
    ];
  }

  mousePressed() {
    this.draggedObj = this.target.find(t => t.isPressed(this.mouseX, this.mouseY));
    this.draggedObj && this.draggedObj.pressed(this.mouseX, this.mouseY);
  }

  mouseDragged() {
    this.draggedObj && this.draggedObj.drag(this.mouseX, this.mouseY);
  }

  mouseReleased() {
    this.draggedObj && this.draggedObj.release();
  }
}
