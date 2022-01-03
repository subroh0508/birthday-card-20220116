import compose from 'lodash/fp/compose';
import { P5Controller } from './controller/P5Controller';
import { Engageable } from './controller/mixins/Engageable';
import { RotateDirection } from './model/mixins/Rotatable';
import Umbrella from './model/Umbrella/index';
import Kiriko from './model/lantica/kiriko/index';
import Kogane from './model/lantica/Kogane/index';
import Mamimi from './model/lantica/Mamimi/index';
import Sakuya from './model/lantica/Sakuya/index';
import Yuika from './model/lantica/Yuika/index';
import Star from './model/star';
import LanticaGear from './model/lantica/LanticaGear';

const CanvasBehavior = compose(Engageable)(P5Controller);

export class Canvas extends CanvasBehavior {
  static get Width() { return 1729; }
  static get Height() { return 1045; }

  gears = [];
  umbrellas = [];

  constructor(
    p5,
    gears = [],
    umbrellas = [],
  ) {
    super(p5);

    this.gears = [
      new Yuika(p5, { translate: { x: 900, y: 600 } }),
      ...gears.map((gear) => new LanticaGear(p5, gear)),
      new Sakuya(p5, { translate: { x: 92, y: 200 }, direction: RotateDirection.RIGHT }),
      new Kogane(p5, { translate: { x: 200, y: 92 }, direction: RotateDirection.LEFT }),
      new Mamimi(p5, { translate: { x: 300, y: 250 }, direction: RotateDirection.LEFT }),
      new Kiriko(p5, { translate: { x: 350, y: 92 }, direction: RotateDirection.RIGHT }),
      ...Star.effects(p5, Canvas.Width, Canvas.Height),
    ];
    this.umbrellas = umbrellas.map((umbrella) => new Umbrella(p5, umbrella));
  }

  get target() {
    return [
      ...this.gears,
      ...this.umbrellas,
    ];
  }

  draw() {
    this.target.forEach(t => {
      if (t.needPower) {
        t.draw(this.isRotatingAll);
        return;
      }

      t.draw();
    });
  }
}
