import compose from 'lodash/fp/compose';
import { Layer } from '../../abstract/Layer';
import { ROMAN_NUMBER_GRAPHIC_SIZE } from '../../abstract/Clock';
import { YUIKA_FACE_RADIUS, YUIKA_FACE_INNER_CIRCLE_RADIUS } from '../constants';
import { ClockTheme } from '../theme/ClockTheme';

const ThemedLayer = compose(ClockTheme)(Layer);

const YUIKA_LONG_HAND_LENGTH = YUIKA_FACE_RADIUS - ROMAN_NUMBER_GRAPHIC_SIZE - 30;
const YUIKA_SHORT_HAND_LENGTH = YUIKA_LONG_HAND_LENGTH - 70;
const YUIKA_LONG_HAND_WIDTH = 14;
const YUIKA_SHORT_HAND_WIDTH = 60;
const YUIKA_SECOND_HAND_LENGTH = YUIKA_LONG_HAND_LENGTH + YUIKA_FACE_INNER_CIRCLE_RADIUS;
const YUIKA_SECOND_HAND_WIDTH = 14;

export class ClockLongHandLayer extends ThemedLayer {
  constructor(p5, order) {
    const height = YUIKA_LONG_HAND_WIDTH + 20;

    super(
      p5,
      { width: YUIKA_LONG_HAND_LENGTH + 30, height },
      { x: 10, y: height / 2 },
      order,
    );
  }

  draw() {
    const offset = 80;

    this.fill(this.secondary);
    this.stroke(this.secondary);
    this.ellipse(0, 0, 14);
    this.quad(0, YUIKA_LONG_HAND_WIDTH / 2, offset, 4, offset, -4, 0, -YUIKA_LONG_HAND_WIDTH / 2);
    this.triangle(0, 5, 0, -5, YUIKA_LONG_HAND_LENGTH, 0);
    this.triangle(offset, 4, offset, -4, offset + 30, 0);
    this.triangle(offset + 60, 8, offset + 60, -8, YUIKA_LONG_HAND_LENGTH - 10, 0);
    this.arc(25, 4, 20, 24, Math.PI, 0);
    this.arc(54, 3, 20, 8, 0, Math.PI);
    this.rotate(Math.PI / 6);
    this.translate(38, -25);
    this.ellipse(0, 0, 16, 8);
    this.translate(-38, 25);
    this.rotate(-Math.PI / 6);
    this.translate(offset, 10);
    this.rotate(-Math.PI / 12);
    this.arc(0, 0, 50, 32, Math.PI + Math.PI / 12, -Math.PI / 12);
    this.rotate(Math.PI / 12);
    this.translate(-offset, -10);

    this.erase();
    this.ellipse(offset + 86, 10, 56, 16);
    this.ellipse(offset + 86, -10, 56, 16);
    this.translate(offset, 10);
    this.rotate(-Math.PI / 12);
    this.arc(0, 0, 40, 22, Math.PI + Math.PI / 12, Math.PI / 12);
    this.rotate(Math.PI / 12);
    this.translate(-offset, -10);
    this.arc(25, 4, 20, 18, Math.PI, 0);
    this.translate(48, 0);
    this.rotate(Math.PI / 8);
    this.ellipse(0, 0, 16, 6);
    this.rotate(-Math.PI / 8);
    this.translate(10, 1);
    this.rotate(-Math.PI / 12);
    this.ellipse(0, 0, 8, 6);
    this.rotate(Math.PI / 12);
    this.translate(-58, -1);
    this.noErase();

    this.fill(this.secondary);
    this.stroke(this.secondary);
    this.arc(25, 5, 20, 2, Math.PI, 0);
  }
}

export class ClockShortHandLayer extends ThemedLayer {
  constructor(p5, order) {
    const height = YUIKA_SHORT_HAND_WIDTH + 20;

    super(
      p5,
      { width: YUIKA_SHORT_HAND_LENGTH + 30, height },
      { x: 0, y: height / 2 },
      order,
    );
  }

  draw() {
    const offset = 50;

    this.fill(this.secondary);
    this.stroke(this.secondary);
    this.rect(0, -2, offset, 4);
    this.triangle(offset - 15, 7, offset - 15, -7, YUIKA_SHORT_HAND_LENGTH, 0);
    this.triangle(offset, 18, offset, -18, YUIKA_SHORT_HAND_LENGTH - 30, 0);
    this.arc(offset, 5, YUIKA_SHORT_HAND_WIDTH / 2, YUIKA_SHORT_HAND_WIDTH / 2, Math.PI / 2, Math.PI);
    this.arc(offset, -5, YUIKA_SHORT_HAND_WIDTH / 2, YUIKA_SHORT_HAND_WIDTH / 2, Math.PI, -Math.PI / 2);
    this.triangle(offset - 20, 10, offset - 13, 6, offset - 13, 12);
    this.triangle(offset - 16, 18, offset - 13, 6, offset - 10, 16);
    this.triangle(offset - 20, -10, offset - 13, -6, offset - 13, -12);
    this.triangle(offset - 16, -18, offset - 13, -6, offset - 10, -16);

    this.erase();
    this.translate(offset, 10);
    this.rotate(-Math.PI / 4);
    this.rect(-3, 0, 8, 20);
    this.rotate(Math.PI / 4);
    this.translate(0, -20);
    this.rotate(Math.PI / 4);
    this.rect(-3, -20, 8, 20);
    this.rotate(-Math.PI / 4);
    this.translate(-offset, 10);
    this.ellipse(offset - 2, 8, 8);
    this.ellipse(offset - 2, -8, 8);
    this.rotate(-Math.PI / 6);
    this.ellipse(offset - 4, 36, 18, 6);
    this.rotate(Math.PI / 6);
    this.rotate(Math.PI / 6);
    this.ellipse(offset - 4, -36, 18, 6);
    this.rotate(-Math.PI / 6);
    this.noErase();

    this.fill(this.secondary);
    this.stroke(this.secondary);
    this.ellipse(offset, 18, 5.6);
    this.ellipse(offset + 10, 12, 1.4);
    this.ellipse(offset, -18, 5.6);
    this.ellipse(offset + 10, -12, 1.4);
  }
}

export class ClockSecondHandLayer extends ThemedLayer {
  constructor(p5, order) {
    super(
      p5,
      { width: YUIKA_SECOND_HAND_LENGTH, height: YUIKA_SECOND_HAND_WIDTH },
      { x: YUIKA_FACE_INNER_CIRCLE_RADIUS, y: YUIKA_LONG_HAND_WIDTH / 2 },
      order,
    );
  }

  draw() {
    this.fill(this.secondary);
    this.stroke(this.light);
    this.rect(0, -1.5, YUIKA_SECOND_HAND_LENGTH - YUIKA_FACE_INNER_CIRCLE_RADIUS, 3);
    this.quad(-YUIKA_FACE_INNER_CIRCLE_RADIUS, 3, 0, 2, 0, -2, -YUIKA_FACE_INNER_CIRCLE_RADIUS, -3);
    this.ellipse(0, 0, YUIKA_SECOND_HAND_WIDTH - 2);
    this.noStroke();
    this.quad(-8, -1.5, 8, -1, 8, 1, -8, 1.5);
  }
}
