import compose from 'lodash/fp/compose';
import { Translatable } from '../mixins/Translatable';
import { Rotatable } from '../mixins/Rotatable';
import { P5Model } from './P5Model';
import { distance as calcDistance } from '../../utilities';

const CircleBehavior = compose(Translatable, Rotatable)(P5Model);

export class Circle extends CircleBehavior {
  radius = 0;
  _backgroundColor = null;

  constructor(p5, args) {
    super(p5, args);

    const { radius, color } = args;
    this.radius = radius || 0;
    this._backgroundColor = color;
  }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this.drawBlock(this);
    this.pop();
  }

  get backgroundColor() { return this.color(this._backgroundColor); }

  diameter() { return this.radius * 2; }

  minDistance(model) {
    if (model instanceof Circle) {
      return this.radius + model.radius;
    }

    return -1;
  }

  includes(mouseX, mouseY) { return this.distance(mouseX, mouseY) <= this.radius; }
  distance(...args) { return calcDistance(this, ...args); }
}
