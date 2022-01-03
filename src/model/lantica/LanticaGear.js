import Gear from '../gear/index';
import {
  LANTICA_GEAR_TEETH_COUNT,
  LANTICA_GEAR_TEETH_HEIGHT,
  LANTICA_INIT_RADIAN,
} from './constants';
import compose from 'lodash/fp/compose';
import { LanticaTheme } from './theme/LanticaTheme';
import { GearLayer } from '../gear/GearLayer';
import { TWO_PI } from '../../utilities';

const ThemedGearLayer = compose(LanticaTheme)(GearLayer);

export default class LanticaGear extends Gear {
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
    const diff = TWO_PI / 24;
    [...Array(3)].forEach((_, i) => {
      this.rotate(rad);
      this.stroke(this.dark);
      this.arc(0, 0, patternDiameter, patternDiameter, -diff / 2, diff / 2, this.PIE);
      this.rect(0, -3, patternDiameter / 2 - 11, 6);
      this.stroke(this.primary);
      this.rect(0, -2, patternDiameter / 2 - 10, 4);
    });

    this.stroke(this.dark);
    this.ellipse(0, 0, 12);

    [...Array(3)].forEach((_, i) => {
      this.rotate(rad);
      this.stroke(this.dark);
      this.stroke(this.primary);
      this.rect(4, -2, 5, 4);
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
    const diff = TWO_PI / 24;
    [...Array(5)].forEach((_, i) => {
      this.rotate(rad);
      this.stroke(this.dark);
      this.arc(0, 0, patternDiameter, patternDiameter, -diff / 2, diff / 2, this.PIE);
      this.rect(5, -3, patternDiameter / 2 - 16, 6);
      this.stroke(this.primary);
      this.rect(4, -2, patternDiameter / 2 - 14, 4);
    });

    this.stroke(this.primary);
    this.ellipse(0, 0, 8);
  }
}
