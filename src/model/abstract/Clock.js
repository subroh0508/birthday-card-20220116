import compose from 'lodash/fp/compose';
import { Translatable } from '../mixins/Translatable';
import { P5Model } from './P5Model';
import { distance as calcDistance, TWO_PI } from '../../utilities';

export const ROMAN_NUMBER_GRAPHIC_SIZE = 48;

const ClockBehavior = compose(Translatable)(P5Model);

export class Clock extends ClockBehavior {
  radius = 0;

  constructor(p5, args) {
    super(p5, args);

    const { radius } = args;
    this.radius = radius || 0;
  }

  draw() {
    this.push();
    this.drawBlock(this);
    this.pop();
  }

  includes(mouseX, mouseY) { return this.distance(mouseX, mouseY) <= this.radius; }
  distance(...args) { return calcDistance(this, ...args); }

  get clockHandAngles() {
    const [hours, minutes, seconds] = this._now;

    const secondAngle = TWO_PI * seconds / 60;
    const minuteAngle = TWO_PI * minutes / 60 + secondAngle / 60;
    const hourAngle = TWO_PI * hours / 12 + minuteAngle / 12;

    return [hourAngle, minuteAngle, secondAngle];
  }

  get _now() {
    const date = new Date(Date.now());

    return [
      date.getHours() % 12,
      date.getMinutes(),
      date.getSeconds(),
    ];
  }
}
