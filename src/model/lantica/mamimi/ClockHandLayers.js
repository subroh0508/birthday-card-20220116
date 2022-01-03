import compose from 'lodash/fp/compose';
import { P5Layer } from '../../abstract/P5Layer';
import { LanticaTheme } from '../theme/LanticaTheme';

const ThemedLayer = compose(LanticaTheme)(P5Layer);

class ClockHandLayer extends ThemedLayer {
  _params = {};

  constructor(p5, size, origin, order, params) {
    super(p5, size, origin, order);

    this._params = params;
  }

  get params() { return this._params; }
  get angle() { return 0; }

  draw() {
    this.stroke(this.light);
    this.fill(this.light);
    this.ellipse(0, 0, 14);
    this.stroke(this.primary);
    this.fill(this.primary);
    this.ellipse(0, 0, 10);

    const { shaftLength, tipWidth, holeDiameter } = this.params;

    this._drawShaft(shaftLength);

    this.translate(shaftLength, 0);
    this._drawHandTip(tipWidth, holeDiameter);
  }

  _drawShaft(length) {
    this.stroke(this.light);
    this.fill(this.light);
    this.rect(6, -1, length, 2);
  }

  _drawHandTip(width, holeDiameter) {
    this.stroke(this.light);
    this.fill(this.light);
    this.rotate(Math.PI / 4);
    this.rect(-6, -6, 12, 12, 2);
    this.rotate(-Math.PI / 4);
    this.rect(6, -3, 6, 6);
    this.triangle(6, 0, width + 6, width / 2, width + 6, -(width / 2));
    this.triangle(width + 6, width / 2, width + 6, -(width / 2), width * 2 + 6, 0);
    this.erase();
    this.ellipse(width + 6, 0, holeDiameter);
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
      {
        shaftLength: 40,
        tipWidth: 24,
        holeDiameter: 10,
      },
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
      {
        shaftLength: 35,
        tipWidth: 20,
        holeDiameter: 8,
      },
    );
  }
}
