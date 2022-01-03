import compose from 'lodash/fp/compose';
import { P5Layer } from '../../abstract/P5Layer';
import { LanticaTheme } from '../theme/LanticaTheme';
import { degToRad } from '../../../utilities';
import { KOGANE_RADIUS } from "../constants";

const ThemedLayer = compose(LanticaTheme)(P5Layer);

class ClockHandLayer extends ThemedLayer {
  _length = 0;

  constructor(p5, size, origin, order, length) {
    super(p5, size, origin, order);

    this._length = length;
  }

  get length() { return this._length; }
  get angle() { return 0; }

  draw() {
    this.stroke(this.light);
    this.fill(this.light);
    this.ellipse(0, 0, 14);
    this.stroke(this.primary);
    this.fill(this.primary);
    this.ellipse(0, 0, 10);

    this.stroke(this.light);
    this.fill(this.light);
    this.rect(6, -1, this.length / 2, 2);

    this.translate(this.length / 2, 0);
    this.rect(24, -3, 6, 6);
    this.stroke(this.primary);
    this.fill(this.primary);
    this.arc(0, 0, 50, 48, -degToRad(18), degToRad(18));
    this.stroke(this.light);
    this.fill(this.light);
    this.arc(0, 0, 48, 48, -degToRad(20), degToRad(20));
    this.rotate(Math.PI / 4);
    this.rect(-6, -6, 12, 12, 2);
    this.rotate(-Math.PI / 4);
    this.triangle(30, 8, 30, -8, 40, 0);
    this.erase();
    this.triangle(32, 4, 32, -4, 37, 0);
    this.noErase();
  }
}

export class LongHandLayer extends ClockHandLayer {
  constructor(p5, size, order) {
    super(
      p5,
      size,
      { x: 10, y: 25 },
      order,
      KOGANE_RADIUS * 1.5,
    );
  }

  get angle() { return Math.PI / 3; }
}

export class ShortHandLayer extends ClockHandLayer {
  constructor(p5, size, order) {
    super(
      p5,
      size,
      { x: 10, y: 25 },
      order,
      KOGANE_RADIUS * 1.5 - 10,
    );
  }
}
