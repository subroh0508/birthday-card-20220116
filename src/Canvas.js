import compose from 'lodash/fp/compose';
import { P5Controller } from './controller/P5Controller';
import { Engageable } from './controller/mixins/Engageable';
import { RotateDirection } from './model/mixins/Rotatable';
import Kiriko from './model/lantica/kiriko/index';
import Kogane from './model/lantica/kogane/index';
import Mamimi from './model/lantica/mamimi/index';
import Sakuya from './model/lantica/sakuya/index';
import Yuika from './model/lantica/yuika/index';
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
    getMessageType = () => 0,
  ) {
    super(p5);

    this.gears = [
      new Yuika(p5, { translate: { x: 1400, y: 550 } }),
      ...LanticaGear.build(p5, GEAR_BUILDING_AREA),
      new Sakuya(p5, { translate: { x: 100, y: 650 }, direction: RotateDirection.RIGHT }),
      new Kogane(p5, { translate: { x: 250, y: 650 }, direction: RotateDirection.LEFT }),
      new Mamimi(p5, { translate: { x: 400, y: 650 }, direction: RotateDirection.LEFT }),
      new Kiriko(p5, { translate: { x: 550, y: 650 }, direction: RotateDirection.RIGHT }),
      new Message(p5, { translate: { x: 100, y: 850 }, getMessageType }),
      ...Star.effects(p5, Canvas.Width, Canvas.Height),
    ];
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
