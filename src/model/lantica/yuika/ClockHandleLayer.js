import compose from 'lodash/fp/compose';
import { P5Layer } from '../../abstract/P5Layer';
import { ClockTheme } from '../theme/ClockTheme';
import { ROMAN_NUMBER_GRAPHIC_SIZE, YUIKA_RADIUS } from "../constants";

const ThemedLayer = compose(ClockTheme)(P5Layer);

const YUIKA_RING_RADIUS = 105;
const YUIKA_CLOCK_HANDLE_WIDTH = ROMAN_NUMBER_GRAPHIC_SIZE + 6;
const YUIKA_RING_POSITION_Y = 120;

export class ClockHandleLayer extends ThemedLayer {
  static get SIZE() { return { width: YUIKA_RING_RADIUS * 2, height: YUIKA_RING_RADIUS + YUIKA_RING_POSITION_Y }; }
  static get ORIGIN() { return { x: YUIKA_RING_RADIUS, y: YUIKA_RING_RADIUS }; }

  constructor(p5, order) {
    super(p5, ClockHandleLayer.SIZE, ClockHandleLayer.ORIGIN, order);
  }

  get translateY() { return YUIKA_RADIUS + YUIKA_RING_POSITION_Y; }

  draw() {
    const offset = YUIKA_CLOCK_HANDLE_WIDTH / 2;

    this.fill(this.primary);
    this.stroke(this.dark);
    this.rotate(Math.PI);
    this.ellipse(0, 0, YUIKA_RING_RADIUS * 2);
    this.ellipse(0, 0, YUIKA_RING_RADIUS * 2 - 28);
    this.rect(-offset - 3, -YUIKA_RING_RADIUS + 5, offset * 2 + 6, 20);

    this.erase();
    this.ellipse(0, 0, YUIKA_RING_RADIUS * 2 - 30);
    this.rect(-offset - 2, -YUIKA_RING_RADIUS, offset * 2 + 4, 20);
    this.noErase();

    this.arc(-offset - 3, -YUIKA_RING_RADIUS + 12, 12, 12, -Math.PI / 2, Math.PI / 2, this.CHORD);
    this.arc(offset + 3, -YUIKA_RING_RADIUS + 12, 12, 12, Math.PI / 2, -Math.PI / 2, this.CHORD);

    this.translate(0, -YUIKA_RING_POSITION_Y / 2);
    this.triangle(-offset, 0, offset, 0, 0, -60);
    this.triangle(-offset + 12, 23, offset - 12, 23, 0, 28);
    this.rect(-offset + 10, 13, offset * 2 - 20, 10);
    this.quad(-offset, 5, offset, 5, offset - 5, 13, -offset + 5, 13);

    this.translate(0, -5);
    const teethWidth = ROMAN_NUMBER_GRAPHIC_SIZE / 8;
    [...Array(9)].reduce(start => {
      this.fill(this.dark);
      this.stroke(this.dark);
      this.triangle(start, 10, start + teethWidth, 10, start + teethWidth / 2, 15);
      this.triangle(start, 5, start + teethWidth, 5, start + teethWidth / 2, 0);
      this.rect(start, 5, teethWidth, 5);
      this.fill(this.primary);
      this.stroke(this.primary);
      this.triangle(start + 1, 9, start + teethWidth - 1, 9, start + teethWidth / 2, 14);
      this.triangle(start + 1, 5, start + teethWidth - 1, 5, start + teethWidth / 2, 1);
      this.rect(start + 1, 5, teethWidth - 2, 5);

      return start + teethWidth;
    }, -YUIKA_CLOCK_HANDLE_WIDTH / 2)
    this.translate(0, -YUIKA_RING_POSITION_Y / 2 + 5);
    this.fill(this.primary);
    this.stroke(this.dark);
    this.arc(0, 30, YUIKA_CLOCK_HANDLE_WIDTH, YUIKA_CLOCK_HANDLE_WIDTH, -(Math.PI + Math.PI / 6), Math.PI / 6, this.CHORD);
    this.arc(0, 0, ROMAN_NUMBER_GRAPHIC_SIZE, ROMAN_NUMBER_GRAPHIC_SIZE, -(Math.PI + Math.PI / 6), Math.PI / 6, this.CHORD);
  }
}
