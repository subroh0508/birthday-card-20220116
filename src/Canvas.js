import compose from 'lodash/fp/compose';
import { P5Controller } from './controller/P5Controller';
import { Collidable } from './controller/mixins/Collidable';
import { Gear } from './model/Gear';
import { Umbrella } from './model/Umbrella';


const CanvasBehavior = compose(Collidable)(P5Controller);

export class Canvas extends CanvasBehavior {
  gears = [];
  umbrellas = [];

  constructor(
    p5,
    gears = [],
    umbrellas = [],
  ) {
    super(p5);

    this.gears = gears.map((gear) => new Gear(p5, gear));
    this.umbrellas = umbrellas.map((umbrella) => new Umbrella(p5, umbrella));
  }

  get target() {
    return [
      ...this.gears,
      ...this.umbrellas,
    ];
  }
}
