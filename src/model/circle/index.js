import compose from 'lodash/fp/compose';
import { Translatable } from '../mixins/Translatable';
import { Rotatable } from '../mixins/Rotatable';
import { P5Model } from '../abstract/P5Model';
import { distance as calcDistance } from '../../utilities';
import { CircleLayer } from './CircleLayer';

const CircleBehavior = compose(Translatable, Rotatable)(P5Model);

export default class Circle extends CircleBehavior {
  _radius = 0

  constructor(p5, args) {
    super(p5, args);

    this._radius = args.radius || 0;
  }

  get radius() { return this._radius };

  minDistance(model) {
    if (model instanceof Circle) {
      return this.radius + model.radius;
    }

    return -1;
  }

  includes(mouseX, mouseY) { return this.distance(mouseX, mouseY) <= this.radius; }
  distance(...args) { return calcDistance(this, ...args); }

  buildLayers() { return [new CircleLayer(this, this.radius)]; }
}
