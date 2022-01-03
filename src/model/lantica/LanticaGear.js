import Gear from '../gear/index';
import {
  LANTICA_GEAR_TEETH_COUNT,
  LANTICA_GEAR_TEETH_HEIGHT,
  LANTICA_INIT_RADIAN,
} from './constants';
import compose from 'lodash/fp/compose';
import { LanticaTheme } from './theme/LanticaTheme';
import { GearLayer } from '../gear/GearLayer';
import { shuffle, TWO_PI } from '../../utilities';

const ThemedGearLayer = compose(LanticaTheme)(GearLayer);

const FRAME_TYPES = [1, 2, 3, 4, 5, 6];
const MIN_RADIUS = 30;
const MAX_RADIUS = 65;

export default class LanticaGear extends Gear {
  static build(p5, { minX, maxX, minY, maxY }) {
    return shuffle([...FRAME_TYPES, ...FRAME_TYPES]).reduce((acc, frameType) => {
      let newGear = null;

      do {
        const [x, y] = _calcTranslatePoint(minX, maxX, minY, maxY);
        const radius = _calcRadius();

        newGear = new LanticaGear(p5, { radius, translate: { x, y }, frameType });
      } while (acc.find(gear => gear.distance(newGear) < gear.minDistance(newGear) + 10));

      return [...acc, newGear];
    }, []);
  }

  _frameType = -1;

  constructor(p5, args) {
    super(p5, { ...args, ..._buildParams(args) });

    this._initRadian = LANTICA_INIT_RADIAN;
    this._frameType = args.frameType || this._frameType;
  }

  get frameType() { return this._frameType; }
  get gears() { return this.layers; };
  get clockHands() { return [] };

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this.gears.forEach(gear => {
      this.image(gear, -gear.origin.x, -gear.origin.y);
    });
    this.pop();

    this.clockHands.forEach(hand => {
      this.push();
      this.translate(this.translateX, this.translateY);
      this.rotate(hand.angle);
      this.image(hand, -hand.origin.x, -hand.origin.y);
      this.pop();
    });
  }

  buildLayers() {
    return [
      new GearFrameLayer(
        this,
        this.radius,
        this.teethHeight,
        this.teethCount,
        this.frameType,
        0,
      ),
    ];
  }
}

const _calcTranslatePoint = (minX, maxX, minY, maxY) => [
  Math.random() * (maxX - minX + 1) + minX,
  Math.random() * (maxY - minY + 1) + minY,
]

const RADIUS_WEIGHT = [
  { range: [MIN_RADIUS, MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) / 3], weight: 0.1 },
  { range: [MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) / 3, MAX_RADIUS - (MAX_RADIUS - MIN_RADIUS) / 3], weight: 0.2 },
  { range: [MAX_RADIUS - (MAX_RADIUS - MIN_RADIUS) / 3, MAX_RADIUS], weight: 0.7 },
]
const _calcRadius = () => {
  const rand = Math.random();
  let position = 0.0;

  for (const item of RADIUS_WEIGHT) {
    position += item.weight;

    if (rand < position) {
      const [min, max] = item.range;

      return Math.random() * (max - min + 1) + min;
    }
  }
}

const _buildParams = (args) => {
  const defaultParams = {
    teethHeight: args.teethHeight || LANTICA_GEAR_TEETH_HEIGHT,
    teethCount: LANTICA_GEAR_TEETH_COUNT,
  };

  switch (args.frameType) {
    case 1:
    case 2:
      return defaultParams;
    case 3:
      return { teethHeight: args.radius * 0.3, teethCount: 9 };
    case 4:
      return { teethHeight: args.radius * 0.15, teethCount: 5 };
    case 5:
    case 6:
      return { ...defaultParams, teethHeight: args.radius * 0.2 };
    default:
      return defaultParams;
  }
}

class GearFrameLayer extends ThemedGearLayer {
  _type = -1;

  constructor(p5, radius, teethHeight, teethCount, type, order) {
    super(p5, radius, teethHeight, teethCount, order);

    this._type = type;
  }

  get type() { return this._type; }

  draw() {
    const method = this[`_drawType${this.type}`];
    if (typeof method === 'function') {
      method.call(this);
      return;
    }

    super.draw();
  }

  _drawType1() {
    this.stroke(this.primary);
    this.fill(this.primary);
    this.frame(this.teethWidth, this.teethWidth - 2);

    this.stroke(this.dark);
    this.strokeWeight(2);
    this.ellipse(0, 0, this.innerDiameter - 15);
    this.ellipse(0, 0, this.innerDiameter - 35);
  }

  _drawType2() {
    this.stroke(this.primary);
    this.fill(this.primary);
    this.frame(this.teethWidth, this.teethWidth - 2);

    const patternDiameter = this.innerDiameter - 15;
    this.stroke(this.dark);
    this.ellipse(0, 0, patternDiameter);

    const rad = TWO_PI / 3;
    const diff = TWO_PI / 24;
    [...Array(3)].forEach((_, i) => {
      this.rotate(rad);
      this.stroke(this.dark);
      this.arc(-10, 0, patternDiameter + 20, patternDiameter, -diff / 2, diff / 2, this.PIE);
      this.stroke(this.primary);
      this.arc(-15, 0, 40, 40, -diff, diff, this.PIE);
    });

    this.stroke(this.dark);
    this.ellipse(0, 0, 10);
  }

  _drawType3() {
    this.stroke(this.primary);
    this.fill(this.primary);
    this.frame(this.teethWidth, this.teethWidth - 4);

    this.ellipse(0, 0, this.innerDiameter + 2);
    this.erase();
    this.ellipse(0, 0, this.innerDiameter - 25);
    this.noErase();
  }

  _drawType4() {
    this.stroke(this.primary);
    this.fill(this.primary);
    this.frame(this.teethWidth / 2, this.teethWidth / 2 - 2);

    this.stroke(this.dark);
    this.ellipse(0, 0, this.innerDiameter);
    this.ellipse(0, 0, this.innerDiameter - 20);
  }

  _drawType5() {
    this.stroke(this.primary);
    this.fill(this.primary);
    this.frame(this.teethWidth, this.teethWidth - 2);

    const patternDiameter = this.innerDiameter - 15;
    this.stroke(this.dark);
    this.ellipse(0, 0, patternDiameter);
    this.erase();
    this.ellipse(0, 0, patternDiameter - 2);
    this.noErase();
    this.stroke(this.primary);
    this.ellipse(0, 0, patternDiameter - 30);

    const rad = TWO_PI / 3;
    [...Array(3)].forEach((_, i) => {
      this.rotate(rad);
      this.stroke(this.dark);
      this.rect(0, -4, patternDiameter / 2 - 1, 8);
      this.stroke(this.primary);
      this.rect(0, -3, patternDiameter / 2 - 1, 6);
    });

    this.stroke(this.dark);
    this.ellipse(0, 0, 14);

    [...Array(3)].forEach((_, i) => {
      this.rotate(rad);
      this.stroke(this.dark);
      this.stroke(this.primary);
      this.rect(4, -3, 5, 6);
    });
  }

  _drawType6() {
    this.stroke(this.primary);
    this.fill(this.primary);
    this.frame(this.teethWidth - 2, this.teethWidth - 4);

    const patternDiameter = this.innerDiameter - 15;
    this.stroke(this.dark);
    this.ellipse(0, 0, patternDiameter);
    this.ellipse(0, 0, patternDiameter - 40);

    const rad = TWO_PI / 5;
    [...Array(5)].forEach((_, i) => {
      this.rotate(rad);
      this.stroke(this.dark);
      this.rect(5, -3, patternDiameter / 2 - 5, 6);
      this.stroke(this.primary);
      this.rect(4, -2, patternDiameter / 2 - 5, 4);
    });

    this.stroke(this.primary);
    this.ellipse(0, 0, 8);
  }
}
