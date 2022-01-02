import Gear from '../gear/index';
import {
  LANTICA_GEAR_TEETH_COUNT,
  LANTICA_GEAR_TEETH_HEIGHT,
  LANTICA_INIT_RADIAN,
} from './constants';

export class LanticaGear extends Gear {
  constructor(p5, args) {
    super(
      p5,
      {
        ...args,
        teethHeight: args.teethHeight || LANTICA_GEAR_TEETH_HEIGHT,
        teethCount: LANTICA_GEAR_TEETH_COUNT,
      }
   );

    this._initRadian = LANTICA_INIT_RADIAN;
  }

  get gears() { return [] };
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
}