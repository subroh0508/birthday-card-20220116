import { Gear } from '../Gear';
import {
  LANTICA_GEAR_TEETH_COUNT,
  LANTICA_GEAR_TEETH_HEIGHT,
  LANTICA_GEAR_COLOR_PRIMARY,
  LANTICA_GEAR_COLOR_DARK,
  LANTICA_GEAR_COLOR_LIGHT,
  LANTICA_INIT_RADIAN,
} from './constants';

export class LanticaGear extends Gear {
  constructor(p5, args) {
    super(
      p5,
      {
        ...args,
        initRadian: LANTICA_INIT_RADIAN,
        teethHeight: args.teethHeight || LANTICA_GEAR_TEETH_HEIGHT,
      }
   );

    this.teethCount = LANTICA_GEAR_TEETH_COUNT;
  }

  get backgroundColor() { return this.primary; }

  get primary() { return this.color(LANTICA_GEAR_COLOR_PRIMARY); }
  get dark() { return this.color(LANTICA_GEAR_COLOR_DARK); }
  get light() { return this.color(LANTICA_GEAR_COLOR_LIGHT); }
}