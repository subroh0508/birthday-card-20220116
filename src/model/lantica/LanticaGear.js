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
}