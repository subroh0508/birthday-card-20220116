import {
  LANTICA_GEAR_COLOR_PRIMARY,
  LANTICA_GEAR_COLOR_DARK,
  LANTICA_GEAR_COLOR_LIGHT,
} from '../constants';

export const LanticaTheme = (Model) => class extends Model {
  get backgroundColor() { return this.primary; }

  get primary() { return this.color(LANTICA_GEAR_COLOR_PRIMARY); }
  get dark() { return this.color(LANTICA_GEAR_COLOR_DARK); }
  get light() { return this.color(LANTICA_GEAR_COLOR_LIGHT); }
}
