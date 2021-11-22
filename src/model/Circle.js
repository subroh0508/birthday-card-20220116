import compose from 'lodash/fp/compose';
import { Translatable } from "./mixins/Translatable";
import { Rotatable } from "./mixins/Rotatable";

const CircleBehavior = compose(Translatable, Rotatable)(class {});

export class Circle extends CircleBehavior {
  radius = 0;

  constructor(args) {
    super(args);

    const { radius } = args;
    this.radius = radius || 0;
  }

  diameter() { return this.radius * 2; }

  pressed(mouseX, mouseY) {
    const { x, y } = this.translate();
    const distance = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));

    if (distance <= this.radius) {
      this.pressed();
    }
  }
}
