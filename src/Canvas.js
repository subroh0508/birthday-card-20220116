import compose from 'lodash/fp/compose';
import { P5Controller } from './controller/P5Controller';
import { Engageable } from './controller/mixins/Engageable';
import { Gear } from './model/Gear';
import { Umbrella } from './model/Umbrella';
import { Kogane } from './model/lantica/Kogane';
import { RotateDirection } from "./model/mixins/Rotatable";

const CanvasBehavior = compose(Engageable)(P5Controller);

export class Canvas extends CanvasBehavior {
  gears = [];
  umbrellas = [];

  constructor(
    p5,
    gears = [],
    umbrellas = [],
  ) {
    super(p5);

    this.gears = [
      ...gears.map((gear) => new Gear(p5, gear)),
      new Kogane(p5, { translate: { x: 200, y: 92 }, direction: RotateDirection.LEFT }),
    ];
    this.umbrellas = umbrellas.map((umbrella) => new Umbrella(p5, umbrella));
  }

  get target() {
    return [
      ...this.gears,
      ...this.umbrellas,
    ];
  }
}
