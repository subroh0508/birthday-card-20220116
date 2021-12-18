import { Clock, ROMAN_NUMBER_GRAPHIC_SIZE } from '../abstract/Clock';
import { TWO_PI } from '../../utilities';

const YUIKA_RADIUS = 300;
const YUIKA_FACE_RADIUS = 260;
const YUIKA_FACE_INNER_CIRCLE_RADIUS = 35;
const YUIKA_MINUTE_SCALE_DIAMETER = (YUIKA_FACE_RADIUS * 2) - 15;
const YUIKA_LONG_HAND_LENGTH = YUIKA_FACE_RADIUS - ROMAN_NUMBER_GRAPHIC_SIZE - 30;
const YUIKA_SHORT_HAND_LENGTH = YUIKA_LONG_HAND_LENGTH - 70;
const YUIKA_LONG_HAND_WIDTH = 14;
const YUIKA_SHORT_HAND_WIDTH = 60;
const YUIKA_SECOND_HAND_LENGTH = YUIKA_LONG_HAND_LENGTH + YUIKA_FACE_INNER_CIRCLE_RADIUS;
const YUIKA_CLOCK_HANDLE_WIDTH = ROMAN_NUMBER_GRAPHIC_SIZE + 6;

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
    this._drawHandle();
    this._drawFrame();
    this._drawFace();
  }

  _drawHandle() {
    this.fill(YUIKA_CLOCK_COLOR_PRIMARY);
    this.stroke(YUIKA_CLOCK_COLOR_DARK);
    this.rotate(Math.PI);
    this.translate(0, YUIKA_RADIUS + 60);

    const offset = YUIKA_CLOCK_HANDLE_WIDTH / 2;
    this.triangle(-offset, 0, offset, 0, 0, -60);
    this.triangle(-offset + 10, 23, offset - 10, 23, 0, 28);
    this.rect(-offset + 10, 13, offset * 2 - 20, 10);
    this.quad(-offset, 5, offset, 5, offset - 5, 13, -offset + 5, 13);

    this.translate(0, -5);
    const teethWidth = ROMAN_NUMBER_GRAPHIC_SIZE / 8;
    [...Array(9)].reduce(start => {
      this.fill(YUIKA_CLOCK_COLOR_DARK);
      this.stroke(YUIKA_CLOCK_COLOR_DARK);
      this.triangle(start, 10, start + teethWidth, 10, start + teethWidth / 2, 15);
      this.triangle(start, 5, start + teethWidth, 5, start + teethWidth / 2, 0);
      this.rect(start, 5, teethWidth, 5);
      this.fill(YUIKA_CLOCK_COLOR_PRIMARY);
      this.stroke(YUIKA_CLOCK_COLOR_PRIMARY);
      this.triangle(start + 1, 9, start + teethWidth - 1, 9, start + teethWidth / 2, 14);
      this.triangle(start + 1, 5, start + teethWidth - 1, 5, start + teethWidth / 2, 1);
      this.rect(start + 1, 5, teethWidth - 2, 5);

      return start + teethWidth;
    }, -YUIKA_CLOCK_HANDLE_WIDTH / 2)
    this.translate(0, -55);
    this.fill(YUIKA_CLOCK_COLOR_PRIMARY);
    this.stroke(YUIKA_CLOCK_COLOR_DARK);
    this.arc(0, 30, YUIKA_CLOCK_HANDLE_WIDTH, YUIKA_CLOCK_HANDLE_WIDTH, -(Math.PI + Math.PI / 6), Math.PI / 6, this.CHORD);
    this.arc(0, 0, ROMAN_NUMBER_GRAPHIC_SIZE, ROMAN_NUMBER_GRAPHIC_SIZE, -(Math.PI + Math.PI / 6), Math.PI / 6, this.CHORD);

    this.translate(0, -YUIKA_RADIUS);
    this.rotate(-Math.PI);
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
    this.strokeWeight(6);
    this.ellipse(0, 0, YUIKA_FACE_INNER_CIRCLE_RADIUS * 2);
    this.strokeWeight(1);

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

    this._drawShortHand(hourAngle);
    this._drawLongHand(minuteAngle);
    this._drawSecondHand(secondAngle);
  }

  _drawLongHand(angle) {
    this._drawHand(angle, () => {
      const offset = 80;

      const gWidth = YUIKA_LONG_HAND_WIDTH + 20;
      const g = this.createGraphics(YUIKA_LONG_HAND_LENGTH + 30, YUIKA_LONG_HAND_WIDTH + 20);

      g.fill(YUIKA_CLOCK_HAND_COLOR);
      g.stroke(YUIKA_CLOCK_HAND_COLOR);
      g.translate(10, gWidth / 2)
      g.ellipse(0, 0, 14);
      g.quad(0, YUIKA_LONG_HAND_WIDTH / 2, offset, 4, offset, -4, 0, -YUIKA_LONG_HAND_WIDTH / 2);
      g.triangle(0, 5, 0, -5, YUIKA_LONG_HAND_LENGTH, 0);
      g.triangle(offset, 4, offset, -4, offset + 30, 0);
      g.triangle(offset + 60, 8, offset + 60, -8, YUIKA_LONG_HAND_LENGTH - 10, 0);
      g.arc(25, 4, 20, 24, Math.PI, 0);
      g.arc(54, 3, 20, 8, 0, Math.PI);
      g.rotate(Math.PI / 6);
      g.translate(38, -25);
      g.ellipse(0, 0, 16, 8);
      g.translate(-38, 25);
      g.rotate(-Math.PI / 6);
      g.translate(offset, 10);
      g.rotate(-Math.PI / 12);
      g.arc(0, 0, 50, 32, Math.PI + Math.PI / 12, -Math.PI / 12);
      g.rotate(Math.PI / 12);
      g.translate(-offset, -10);

      g.erase();
      g.ellipse(offset + 86, 10, 56, 16);
      g.ellipse(offset + 86, -10, 56, 16);
      g.translate(offset, 10);
      g.rotate(-Math.PI / 12);
      g.arc(0, 0, 40, 22, Math.PI + Math.PI / 12, Math.PI / 12);
      g.rotate(Math.PI / 12);
      g.translate(-offset, -10);
      g.arc(25, 4, 20, 18, Math.PI, 0);
      g.translate(48, 0);
      g.rotate(Math.PI / 8);
      g.ellipse(0, 0, 16, 6);
      g.rotate(-Math.PI / 8);
      g.translate(10, 1);
      g.rotate(-Math.PI / 12);
      g.ellipse(0, 0, 8, 6);
      g.rotate(Math.PI / 12);
      g.translate(-58, -1);
      g.noErase();

      g.fill(YUIKA_CLOCK_HAND_COLOR);
      g.stroke(YUIKA_CLOCK_HAND_COLOR);
      g.arc(25, 5, 20, 2, Math.PI, 0);

      this.image(g, -10, -gWidth / 2);
    });
  }

  _drawShortHand(angle) {
    this._drawHand(angle, () => {
      const offset = 50;

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
      this.stroke(YUIKA_CLOCK_COLOR_LIGHT);
      this.rect(0, -1.5, YUIKA_SECOND_HAND_LENGTH - YUIKA_FACE_INNER_CIRCLE_RADIUS, 3);
      this.quad(-YUIKA_FACE_INNER_CIRCLE_RADIUS, 3, 0, 2, 0, -2, -YUIKA_FACE_INNER_CIRCLE_RADIUS, -3);
      this.ellipse(0, 0, 12);
      this.noStroke();
      this.quad(-8, -1.5, 8, -1, 8, 1, -8, 1.5);
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

