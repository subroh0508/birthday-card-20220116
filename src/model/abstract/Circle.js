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

  includes(mouseX, mouseY) {
    return this.distance(mouseX, mouseY) <= this.radius;
  }

  distance(...args) {
    switch (args.length) {
      case 1:
        const model = args[0];
        return this._distanceFromModel(model);
      case 2:
        const [x, y] = args;
        return Math.sqrt(Math.pow(this.translateX - x, 2) + Math.pow(this.translateY - y, 2));
      default:
        return -1;
    }
  }

  _distanceFromModel(model) {
    if (model instanceof Circle) {
      return this.distance(model.translateX, model.translateY);
    }

    return -1;
  }
}
