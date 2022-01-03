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
import Message from './model/message';

const CanvasBehavior = compose(Engageable)(P5Controller);

const GEAR_BUILDING_AREA = { minX: 100, maxX: 1000, minY: 100, maxY: 550 };

export class Canvas extends CanvasBehavior {
  static get Width() { return 1729; }
  static get Height() { return 1045; }

  gears = [];
  umbrellas = [];

  constructor(
    p5,
    umbrellas = [],
  ) {
    super(p5);

    this.gears = [
      new Yuika(p5, { translate: { x: 1400, y: 550 } }),
      ...LanticaGear.build(p5, GEAR_BUILDING_AREA),
      new Sakuya(p5, { translate: { x: 100, y: 650 }, direction: RotateDirection.RIGHT }),
      new Kogane(p5, { translate: { x: 250, y: 650 }, direction: RotateDirection.LEFT }),
      new Mamimi(p5, { translate: { x: 400, y: 650 }, direction: RotateDirection.LEFT }),
      new Kiriko(p5, { translate: { x: 550, y: 650 }, direction: RotateDirection.RIGHT }),
      new Message(p5, { translate: { x: 550, y: 850 } }),
      ...Star.effects(p5, Canvas.Width, Canvas.Height),
    ];
    //this.umbrellas = umbrellas.map((umbrella) => new Umbrella(p5, umbrella));
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
