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

const ClockBehavior = compose(Translatable)(P5Model);

export default class Yuika extends ClockBehavior {
  _parts = [];
  _hands = [];

  constructor(p5, args) {
    super(p5, { ...args, radius: YUIKA_RADIUS });

    this._parts = [
      new ClockHandle(p5),
      new ClockFace(p5),
      new ClockCover(p5),
    ];
  }

  get parts() { return this._parts; }
  get hands() { return this._hands; }

  get handle() { return this.parts[0]; }
  get face() { return this.parts[1]; }
  get cover() { return this.parts[2]; }

  setup() {
    const hands = [
      new ClockShortHandLayer(this, 0),
      new ClockLongHandLayer(this, 1),
      new ClockSecondHandLayer(this, 2),
    ];
    this.parts.forEach(part => part.setup());
    hands.forEach(hand => hand.setup());
    this._hands = hands;
  }

  draw() {
    this._drawClock();
    this._drawHands();
  }

  includes(x, y) { return this.parts.some(part => part.includes(this, x, y)); }

  get _now() {
    const date = new Date(Date.now());

    return [
      date.getHours() % 12,
      date.getMinutes(),
      date.getSeconds(),
    ];
  }

  get _clockHandAngles() {
    const [hours, minutes, seconds] = this._now;

    const secondAngle = (TWO_PI * seconds / 60) - Math.PI / 2;
    const minuteAngle = (TWO_PI * minutes / 60 + secondAngle / 60) - Math.PI / 2;
    const hourAngle = (TWO_PI * hours / 12 + minuteAngle / 12) - Math.PI / 2;

    return [hourAngle, minuteAngle, secondAngle];
  }

  _drawClock() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.handle.draw();
    this.face.draw();
    this.cover.draw();
    this.pop();
  }

  _drawHands() {
    this._clockHandAngles.forEach((angle, i) => {
      this._drawHand(angle, this.hands[i]);
    });
  }

  _drawHand(angle, hand) {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(angle);
    this.image(hand, -hand.origin.x, -hand.origin.y);
    this.pop();
  }
}
