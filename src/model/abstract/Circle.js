import compose from 'lodash/fp/compose';
import { Translatable } from '../mixins/Translatable';
import { Rotatable } from '../mixins/Rotatable';
import { P5Model } from './P5Model';

const CircleBehavior = compose(Translatable, Rotatable)(P5Model);

export class Circle extends CircleBehavior {
  radius = 0;
  backgroundColor = null;

  constructor(p5, args) {
    super(p5, args);

    const { radius, color } = args;
    this.radius = radius || 0;
    this.backgroundColor = this.color(color);
  }

  diameter() { return this.radius * 2; }

  isPressed(mouseX, mouseY) {
    const distance = Math.sqrt(Math.pow(this.translateX - mouseX, 2) + Math.pow(this.translateY - mouseY, 2));

    return distance <= this.radius;
  }
}
