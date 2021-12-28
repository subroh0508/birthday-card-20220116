const YUIKA_CLOCK_COLOR_PRIMARY = '#EBA761';
const YUIKA_CLOCK_COLOR_LIGHT = '#D8DFC5';
const YUIKA_CLOCK_COLOR_DARK = '#5E3C2D';

export const ClockTheme = (Model) => class extends Model {
  get primary() { return this.color(YUIKA_CLOCK_COLOR_PRIMARY); }
  get dark() { return this.color(YUIKA_CLOCK_COLOR_DARK); }
  get light() { return this.color(YUIKA_CLOCK_COLOR_LIGHT); }
};
