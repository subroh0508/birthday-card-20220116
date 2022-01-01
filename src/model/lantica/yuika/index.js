import compose from 'lodash/fp/compose';
import { Translatable } from '../../mixins/Translatable';
import { P5Model } from '../../abstract/P5Model';
import { distance as calcDistance, TWO_PI } from '../../../utilities';
import { ClockHandle } from './ClockHandle';
import { ClockCover } from './ClockCover';
import { ClockFace } from './ClockFace';
import { YUIKA_RADIUS } from "../constants";

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

  get handle() { return this.parts[0]; }
  get face() { return this.parts[1]; }
  get cover() { return this.parts[2]; }

  setup() { this.parts.forEach(part => part.setup()); }

  draw() {
    this._drawClock();
    this._drawHands();
  }

  includes(x, y) { return this.parts.some(layer => layer.includes(x, y)); }

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
    const [hour, minute, second] = this._clockHandAngles;

    //this._drawShortHand(hour);
    //this._drawLongHand(minute);
    //this._drawSecondHand(second);
  }
}
