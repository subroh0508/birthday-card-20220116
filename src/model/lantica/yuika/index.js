import compose from 'lodash/fp/compose';
import { Translatable } from '../../mixins/Translatable';
import { P5Model } from '../../abstract/P5Model';
import { distance as calcDistance, TWO_PI } from '../../../utilities';
import { ClockHandle } from './ClockHandle';
import { ClockCover } from './ClockCover';
import { ClockFace } from './ClockFace';
import { YUIKA_RADIUS } from '../constants';
import { ClockShortHandLayer } from './ClockHandLayers';
import { ClockLongHandLayer } from './ClockHandLayers';
import { ClockSecondHandLayer } from './ClockHandLayers';
import { ClockBlurLayer } from './ClockBlurLayer';

const ClockBehavior = compose(Translatable)(P5Model);

export default class Yuika extends ClockBehavior {
  _parts = [];
  _timezoneOffset = new Date().getTimezoneOffset() / 60;
  _clockTimes = [];

  constructor(p5, args) {
    super(p5, { ...args, radius: YUIKA_RADIUS });

    this._parts = [
      new ClockHandle(p5),
      new ClockFace(p5),
      new ClockCover(p5),
    ];
    this._clockTimes = _buildClockTimes(
      Math.trunc(Math.random() * 1000 * 60 * 60 * 24),
      this._timezoneOffset,
    );
  }

  get needPower() { return true; }

  get parts() { return this._parts; }

  get handle() { return this.parts[0]; }
  get face() { return this.parts[1]; }
  get cover() { return this.parts[2]; }

  get blur() { return this.layers.slice(-1)[0]; }

  setup() {
    this.parts.forEach(part => part.setup());
    super.setup();
  }

  draw(hasPower) {
    this._drawClock();
    this._drawHands(hasPower);
    this._drawBlur(hasPower);
  }

  includes(x, y) { return this.parts.some(part => part.includes(this, x, y)); }

  buildLayers() {
    return [
      new ClockShortHandLayer(this, 0),
      new ClockLongHandLayer(this, 1),
      new ClockSecondHandLayer(this, 2),
      new ClockBlurLayer(this, 3),
    ];
  }

  get _now() { return _buildClockTimes(Date.now(), this._timezoneOffset); }

  _drawClock() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.handle.draw();
    this.face.draw();
    this.cover.draw();
    this.pop();
  }

  _drawHands(hasPower) {
    this._clockHandAngles(hasPower).forEach((angle, i) => {
      this._drawHand(angle, this.layers[i]);
    });
  }

  _drawHand(angle, hand) {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(angle);
    this.image(hand, -hand.origin.x, -hand.origin.y);
    this.pop();
  }

  _drawBlur(hasPower) {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.blur.draw(hasPower);
    this.image(this.blur, -this.blur.origin.x, -this.blur.origin.y);
    this.pop();
  }

  _clockHandAngles(hasPower) {
    if (!hasPower) {
      return _calcHandAngles(...this._clockTimes);
    }

    const [nowHours, nowMinutes, nowSeconds] = this._now;
    const [hours, minutes, seconds] = this._clockTimes;

    this._clockTimes = [
      nowHours === hours ? nowHours : (hours + 1) % 12,
      nowMinutes === minutes ? nowMinutes : (minutes + 1) % 60,
      nowSeconds === seconds ? nowSeconds : (seconds + 1) % 60,
    ];
    return _calcHandAngles(...this._clockTimes);
  }
}

const _buildClockTimes = (milliSeconds, timezoneOffset) => {
  const seconds = Math.trunc(milliSeconds / 1000);
  const minutes = Math.trunc(seconds / 60);
  const hour = Math.trunc(minutes / 60 - timezoneOffset);

  return [hour % 12, minutes % 60, seconds % 60];
};

const _calcHandAngles = (hours, minutes, seconds) => {
  const secondAngle = TWO_PI * seconds / 60;
  const minuteAngle = TWO_PI * minutes / 60 + secondAngle / 60;
  const hourAngle = TWO_PI * hours / 12 + minuteAngle / 12;

  return [hourAngle - Math.PI / 2, minuteAngle - Math.PI / 2, secondAngle - Math.PI / 2];
}
