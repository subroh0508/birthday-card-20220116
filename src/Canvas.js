import compose from 'lodash/fp/compose';
import { P5Controller } from './controller/P5Controller';
import { Engageable } from './controller/mixins/Engageable';
import Gear from './model/gear/index';
import { Umbrella } from './model/Umbrella';
import Kiriko from './model/lantica/kiriko/index';
import Kogane from './model/lantica/Kogane/index';
import Mamimi from './model/lantica/Mamimi/index';
import { Sakuya } from './model/lantica/Sakuya';
import Yuika from './model/lantica/Yuika/index';
import { RotateDirection } from './model/mixins/Rotatable';

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
      new Yuika(p5, { translate: { x: 900, y: 300 } }),
      ...gears.map((gear) => new Gear(p5, gear)),
      new Sakuya(p5, { translate: { x: 92, y: 200 }, direction: RotateDirection.RIGHT }),
      new Kogane(p5, { translate: { x: 200, y: 92 }, direction: RotateDirection.LEFT }),
      new Mamimi(p5, { translate: { x: 300, y: 250 }, direction: RotateDirection.LEFT }),
      new Kiriko(p5, { translate: { x: 350, y: 92 }, direction: RotateDirection.RIGHT }),
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
