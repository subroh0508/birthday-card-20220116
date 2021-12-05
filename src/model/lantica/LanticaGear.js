import { Gear } from '../Gear';
import {
  LANTICA_GEAR_TEETH_COUNT,
  LANTICA_GEAR_TEETH_HEIGHT,
  LANTICA_GEAR_COLOR_PRIMARY,
  LANTICA_GEAR_COLOR_DARK,
  LANTICA_GEAR_COLOR_LIGHT,
} from './constants';

export class LanticaGear extends Gear {
  constructor(p5, args) {
    super(p5, args);

    this.teethCount = LANTICA_GEAR_TEETH_COUNT;
  }

  get innerRadius() { return this.radius - LANTICA_GEAR_TEETH_HEIGHT; }
  get teethHeight() { return LANTICA_GEAR_TEETH_HEIGHT; }

  get backgroundColor() { return this.primary; }

  get primary() { return this.color(LANTICA_GEAR_COLOR_PRIMARY); }
  get dark() { return this.color(LANTICA_GEAR_COLOR_DARK); }
  get light() { return this.color(LANTICA_GEAR_COLOR_LIGHT); }
}