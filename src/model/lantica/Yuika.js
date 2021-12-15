import { Clock, ROMAN_NUMBER_GRAPHIC_SIZE } from '../abstract/Clock';
import { TWO_PI } from '../../utilities';

const YUIKA_RADIUS = 300;
const YUIKA_FACE_RADIUS = 260;
const YUIKA_MINUTE_SCALE_DIAMETER = (YUIKA_FACE_RADIUS * 2) - 15;
const YUIKA_LONG_HAND_LENGTH = YUIKA_FACE_RADIUS - ROMAN_NUMBER_GRAPHIC_SIZE - 30;
const YUIKA_SHORT_HAND_LENGTH = YUIKA_LONG_HAND_LENGTH - 70;
const YUIKA_SHORT_HAND_WIDTH = 60;
const YUIKA_SECOND_HAND_LENGTH = YUIKA_LONG_HAND_LENGTH + 50;

const YUIKA_CLOCK_COLOR_PRIMARY = '#EBA761';
const YUIKA_CLOCK_COLOR_LIGHT = '#D8DFC5';
const YUIKA_CLOCK_COLOR_DARK = '#5E3C2D';
const YUIKA_CLOCK_FACE_COLOR = '#DEE0D5';
const YUIKA_CLOCK_DIAL_COLOR = '#D0A891';
const YUIKA_CLOCK_HAND_COLOR = '#9C7A74';

export class Yuika extends Clock {
  constructor(p5, args) {
    super(p5, { ...args, radius: YUIKA_RADIUS });
  }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this._drawClock();
    this.pop();

    this._drawHands();
  }

  _drawClock() {
    this._drawFrame();
    this._drawFace();
  }

  _drawFrame() {
    this.fill(YUIKA_CLOCK_COLOR_PRIMARY);
    this.stroke(YUIKA_CLOCK_COLOR_DARK);
    this.ellipse(0, 0, YUIKA_RADIUS * 2);
    this.stroke(YUIKA_CLOCK_COLOR_LIGHT);
    this.strokeWeight(5);
    this.ellipse(0, 0, (YUIKA_FACE_RADIUS + (YUIKA_RADIUS - YUIKA_FACE_RADIUS) / 2) * 2);
    this.strokeWeight(1);
  }

  _drawFace() {
    this.fill(YUIKA_CLOCK_FACE_COLOR);
    this.stroke(YUIKA_CLOCK_FACE_COLOR);
    this.ellipse(0, 0, YUIKA_FACE_RADIUS * 2);

    this.stroke(YUIKA_CLOCK_DIAL_COLOR);
    const minuteRad = TWO_PI / 60;
    [...Array(60)].reduce(start => {
      this.arc(0, 0, YUIKA_MINUTE_SCALE_DIAMETER, YUIKA_MINUTE_SCALE_DIAMETER, start, start + minuteRad, this.PIE);
      return start + minuteRad;
    }, -TWO_PI / 240);

    this.fill(YUIKA_CLOCK_DIAL_COLOR);
    const dialRad = TWO_PI / 12;
    [...Array(12)].reduce(start => {
      this.arc(0, 0, YUIKA_MINUTE_SCALE_DIAMETER, YUIKA_MINUTE_SCALE_DIAMETER, start, start + minuteRad / 2, this.PIE);
      return start + dialRad;
    }, -TWO_PI / 240 - minuteRad / 4);

    this.fill(YUIKA_CLOCK_FACE_COLOR);
    this.ellipse(0, 0, YUIKA_MINUTE_SCALE_DIAMETER - 10);

    this.fill(YUIKA_CLOCK_DIAL_COLOR);
    const textY = (YUIKA_MINUTE_SCALE_DIAMETER - 20) / 2 - ROMAN_NUMBER_GRAPHIC_SIZE;
    this.rotate(Math.PI + dialRad);
    [...Array(12)].forEach((_, i) => {
      this._drawDial(i + 1, 6 - ROMAN_NUMBER_GRAPHIC_SIZE / 2, textY);
      this.rotate(dialRad);
    });
  }

  _drawDial(n, x, y) {
    this.image(this.createNumber(n, YUIKA_CLOCK_DIAL_COLOR), x, y);
  }

  _drawHands() {
    const [hourAngle, minuteAngle, secondAngle] = this.clockHandAngles;

    this._drawSecondHand(secondAngle);
    this._drawShortHand(hourAngle);
    this._drawLongHand(minuteAngle);
  }

  _drawLongHand(angle) {
    this._drawHand(angle, () => {
      this.rect(0, 0, YUIKA_LONG_HAND_LENGTH, 2);
    });
  }

  _drawShortHand(angle) {
    this._drawHand(angle, () => {
      const offset = YUIKA_SECOND_HAND_LENGTH - YUIKA_LONG_HAND_LENGTH

      const gWidth = YUIKA_SHORT_HAND_WIDTH + 20;
      const g = this.createGraphics(YUIKA_SHORT_HAND_LENGTH + 30, YUIKA_SHORT_HAND_WIDTH + 20);

      g.translate(0, gWidth / 2)
      g.fill(YUIKA_CLOCK_HAND_COLOR);
      g.stroke(YUIKA_CLOCK_HAND_COLOR);
      g.rect(0, -2, offset, 4);
      g.triangle(offset - 15, 7, offset - 15, -7, YUIKA_SHORT_HAND_LENGTH, 0);
      g.triangle(offset, 18, offset, -18, YUIKA_SHORT_HAND_LENGTH - 30, 0);
      g.arc(offset, 5, YUIKA_SHORT_HAND_WIDTH / 2, YUIKA_SHORT_HAND_WIDTH / 2, Math.PI / 2, Math.PI);
      g.arc(offset, -5, YUIKA_SHORT_HAND_WIDTH / 2, YUIKA_SHORT_HAND_WIDTH / 2, Math.PI, -Math.PI / 2);
      g.triangle(offset - 20, 10, offset - 13, 6, offset - 13, 12);
      g.triangle(offset - 16, 18, offset - 13, 6, offset - 10, 16);
      g.triangle(offset - 20, -10, offset - 13, -6, offset - 13, -12);
      g.triangle(offset - 16, -18, offset - 13, -6, offset - 10, -16);

      g.erase();
      g.translate(offset, 10);
      g.rotate(-Math.PI / 4);
      g.rect(-3, 0, 8, 20);
      g.rotate(Math.PI / 4);
      g.translate(0, -20);
      g.rotate(Math.PI / 4);
      g.rect(-3, -20, 8, 20);
      g.rotate(-Math.PI / 4);
      g.translate(-offset, 10);
      g.ellipse(offset - 2, 8, 8);
      g.ellipse(offset - 2, -8, 8);
      g.rotate(-Math.PI / 6);
      g.ellipse(offset - 4, 36, 18, 6);
      g.rotate(Math.PI / 6);
      g.rotate(Math.PI / 6);
      g.ellipse(offset - 4, -36, 18, 6);
      g.rotate(-Math.PI / 6);
      g.noErase();

      g.fill(YUIKA_CLOCK_HAND_COLOR);
      g.stroke(YUIKA_CLOCK_HAND_COLOR);
      g.ellipse(offset, 18, 5.6);
      g.ellipse(offset + 10, 12, 1.4);
      g.ellipse(offset, -18, 5.6);
      g.ellipse(offset + 10, -12, 1.4);

      this.image(g, 0, -gWidth / 2);
    });
  }

  _drawSecondHand(angle) {
    this._drawHand(angle, () => {
      this.rect(YUIKA_LONG_HAND_LENGTH - YUIKA_SECOND_HAND_LENGTH, 0, YUIKA_SECOND_HAND_LENGTH, 2);
    });
  }

  _drawHand(angle, block) {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(angle - Math.PI / 2);
    this.fill(YUIKA_CLOCK_HAND_COLOR);
    this.stroke(YUIKA_CLOCK_HAND_COLOR);
    block.bind(this)();
    this.pop();
  }
}

