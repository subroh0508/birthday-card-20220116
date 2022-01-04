import compose from 'lodash/fp/compose';
import { P5Layer } from '../../abstract/P5Layer';
import { ROMAN_NUMBER_GRAPHIC_SIZE, YUIKA_RADIUS, YUIKA_FACE_RADIUS } from '../constants';
import { ClockTheme } from '../theme/ClockTheme';
import { TWO_PI } from '../../../utilities';

const ThemedLayer = compose(ClockTheme)(P5Layer);

const YUIKA_FACE_INNER_CIRCLE_RADIUS = 35;
const YUIKA_MINUTE_SCALE_DIAMETER = (YUIKA_FACE_RADIUS * 2) - 15;

const YUIKA_CLOCK_FACE_COLOR = '#DEE0D5';
const YUIKA_CLOCK_DIAL_COLOR = '#D0A891';

export class ClockFaceLayer extends ThemedLayer {
  constructor(p5, order) {
    super(
      p5,
      { width: YUIKA_RADIUS * 2, height: YUIKA_RADIUS * 2 },
      { x: YUIKA_RADIUS, y: YUIKA_RADIUS },
      order,
    );
  }

  draw() {
    this.fill(this.primary);
    this.stroke(this.dark);
    this.ellipse(0, 0, YUIKA_RADIUS * 2);
    this.stroke(this.light);
    this.strokeWeight(5);
    this.ellipse(0, 0, (YUIKA_FACE_RADIUS + (YUIKA_RADIUS - YUIKA_FACE_RADIUS) / 2) * 2);
    this.strokeWeight(1);

    this.fill(YUIKA_CLOCK_FACE_COLOR);
    this.stroke(YUIKA_CLOCK_FACE_COLOR);
    this.ellipse(0, 0, YUIKA_FACE_RADIUS * 2);

    this.stroke(YUIKA_CLOCK_DIAL_COLOR);
    const minuteRad = TWO_PI / 60;
    [...Array(60)].reduce(start => {
      this.arc(0, 0, YUIKA_MINUTE_SCALE_DIAMETER, YUIKA_MINUTE_SCALE_DIAMETER, start, start + minuteRad, this.PIE);
      return start + minuteRad;
    }, -TWO_PI / 240 + minuteRad / 4);

    this.fill(YUIKA_CLOCK_DIAL_COLOR);
    const dialRad = TWO_PI / 12;
    [...Array(12)].reduce(start => {
      this.arc(0, 0, YUIKA_MINUTE_SCALE_DIAMETER, YUIKA_MINUTE_SCALE_DIAMETER, start, start + minuteRad / 2, this.PIE);
      return start + dialRad;
    }, -TWO_PI / 240);

    this.fill(YUIKA_CLOCK_FACE_COLOR);
    this.ellipse(0, 0, YUIKA_MINUTE_SCALE_DIAMETER - 10);
    this.strokeWeight(6);
    this.ellipse(0, 0, YUIKA_FACE_INNER_CIRCLE_RADIUS * 2);
    this.strokeWeight(1);
  }
}

export class ClockDialLayer extends ThemedLayer {
  constructor(p5, order) {
    const diameter = YUIKA_MINUTE_SCALE_DIAMETER - 20;

    super(
      p5,
      { width: diameter, height: diameter },
      { x: diameter / 2, y: diameter / 2 },
      order,
    );
  }

  draw() {
    const dialRad = TWO_PI / 12;
    const offset = this.origin.x - 10;
    const startRad = 3 * Math.PI / 2;

    this.translate(0, -offset);
    [...Array(12)].reduce((radian, _, i) => {
      const x = offset * (Math.cos(radian + dialRad) - Math.cos(radian));
      const y = offset * (Math.sin(radian + dialRad) - Math.sin(radian));
      const numberAngle = radian - startRad + dialRad;

      this.translate(x, y);
      this.rotate(numberAngle);
      this._drawNumber(i + 1);
      this.rotate(-numberAngle);

      return radian + dialRad;
    }, startRad);
  }

  _drawNumber(n) {
    this.strokeWeight(0);
    this.fill(this.secondary);
    switch (n) {
      case 1:
        this._drawOne(0);
        break;
      case 2:
        this._drawTwo(0);
        break;
      case 3:
        this._drawThree(0);
        break;
      case 4:
        this._drawFour(0);
        break;
      case 5:
        this._drawFive(0);
        break;
      case 6:
        this._drawSix(0);
        break;
      case 7:
        this._drawSeven(0);
        break;
      case 8:
        this._drawEight(0);
        break;
      case 9:
        this._drawNine(0);
        break;
      case 10:
        this._drawTen(0);
        break;
      case 11:
        this._drawEleven(0);
        break;
      case 12:
        this._drawTwelve(0);
        break;
    }
  }

  _drawOne(offset) {
    this.translate(offset, 0);
    this._drawRomanOne();
    this.translate(-offset, 0);
  }

  _drawTwo(offset) {
    this._drawOne(offset - 3.5);
    this._drawOne(offset + 3.5);
  }

  _drawThree(offset) {
    this._drawOne(offset - 7);
    this._drawOne(offset);
    this._drawOne(offset + 7);
  }

  _drawFour(offset) {
    this._drawOne(offset - 10.5);
    this._drawTwo(offset);
    this._drawOne(offset + 10.5);
  }

  _drawFive(offset) {
    this.translate(offset, 0);
    this._drawRomanFive();
    this.translate(-offset, 0);
  }

  _drawSix(offset) {
    this._drawFive(offset - 2.5);
    this._drawOne(offset + 13);
  }

  _drawSeven(offset) {
    this._drawSix(offset - 3.5);
    this._drawOne(offset + 16.5);
  }

  _drawEight(offset) {
    this._drawSeven(offset - 3.5);
    this._drawOne(offset + 20);
  }

  _drawNine(offset) {
    this._drawOne(offset - 13.5);
    this._drawTen(offset + 3.5);
  }

  _drawTen(offset) {
    this.translate(offset, 0);
    this._drawRomanTen();
    this.translate(-offset, 0);
  }

  _drawEleven(offset) {
    this._drawTen(offset - 3.5);
    this._drawOne(offset + 13.5);
  }

  _drawTwelve(offset) {
    this._drawEleven(offset - 3.5);
    this._drawOne(offset + 17);
  }

  _drawRomanOne() {
    this.rect(-2.5, 0, 5, ROMAN_NUMBER_GRAPHIC_SIZE);
    this.rect(-3.5, 0, 7, 2);
    this.rect(-3.5, ROMAN_NUMBER_GRAPHIC_SIZE - 2, 7, 2);
  }

  _drawRomanFive() {
    this.quad(-13, 0, -8, 0, 2.5, ROMAN_NUMBER_GRAPHIC_SIZE, -2.5, ROMAN_NUMBER_GRAPHIC_SIZE);
    this.quad(8, 0, 11, 0, 2.5, ROMAN_NUMBER_GRAPHIC_SIZE, 0.5, ROMAN_NUMBER_GRAPHIC_SIZE);
    this.rect(-14, 0, 7, 2);
    this.rect(7, 0, 5, 2);
  }

  _drawRomanTen() {
    this.quad(-13, 0, -8, 0, 13, ROMAN_NUMBER_GRAPHIC_SIZE, 8, ROMAN_NUMBER_GRAPHIC_SIZE);
    this.quad(10, 0, 13, 0, -10, ROMAN_NUMBER_GRAPHIC_SIZE, -13, ROMAN_NUMBER_GRAPHIC_SIZE);
    this.rect(-14, 0, 7, 2);
    this.rect(7, ROMAN_NUMBER_GRAPHIC_SIZE - 2, 7, 2);
    this.rect(9, 0, 5, 2);
    this.rect(-14, ROMAN_NUMBER_GRAPHIC_SIZE - 2, 5, 2);
  }
}

const MIN_ALPHA = 150;
const MAX_ALPHA = 255;

export class ClockFaceBlurLayer extends P5Layer {
  _blur = MIN_ALPHA;

  constructor(p5, order) {
    super(
      p5,
      { width: YUIKA_FACE_RADIUS * 2, height: YUIKA_FACE_RADIUS * 2 },
      { x: YUIKA_FACE_RADIUS, y: YUIKA_FACE_RADIUS },
      order,
    );
  }

  get blur() { return this._blur; }

  lighten() { if (this.blur < MAX_ALPHA) this._blur += 10; }
  darken() { if (this.blur > MIN_ALPHA) this._blur -= 10; }

  next(hasPower) {
    hasPower ? this.lighten() : this.darken();

    this.draw();
  }

  draw() {
    this.fill(0);
    this.noStroke();
    this.ellipse(0, 0, YUIKA_FACE_RADIUS * 2);
    this.erase(this.blur);
    this.ellipse(0, 0, YUIKA_FACE_RADIUS * 2 + 2);
    this.noErase();
  }
}
