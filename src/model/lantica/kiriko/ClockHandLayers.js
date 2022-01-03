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
    this.ellipse(0, 0, 6);

    this._drawDiamondFrame(
      this.params.frameWidth,
      this.params.frameHeight,
      this.params.shaftLength,
      this.params.beadsRadius,
    );

    this.translate(this.params.beadsRadius, 0);
    this._drawDiamond();
  }

  _drawDiamondFrame(width, height, shaftLength, beadsRadius) {
    const hOffset = height / 2 - 3;

    this.translate(3, 0);
    this.triangle(0, 0, width / 2, height / 2, width / 2, -height / 2);
    this.triangle(width / 2, height / 2, width / 2, -height / 2, width , 0);
    this.rect(width - 6, -1, shaftLength, 2);
    this.translate(5, 0);
    this.erase();
    this.triangle(0, 0, width / 2 - 5, hOffset, width / 2 - 5, -hOffset);
    this.triangle(width / 2 - 5, hOffset, width / 2 - 5, -hOffset, width - 5 * 2, 0);
    this.noErase();

    this.stroke(this.light);
    this.fill(this.light);
    this.translate(width + shaftLength - 9, 0);
    this.ellipse(0, 0, beadsRadius);
    this.ellipse(beadsRadius, 0, beadsRadius);
  }

  _drawDiamond() {
    this.stroke(this.light);
    this.fill(this.light);
    this.triangle(0, 0, 15, 10, 15, -10);
    this.triangle(15, 10, 15, -10, 18 * 2, 0);
    this.stroke(this.primary);
    this.fill(this.light);
    this.translate(3, 0);
    this.triangle(0, 0, 15 - 3, 8, 15 - 3, -8);
    this.triangle(15 - 3, 8, 15 - 3, -8, 18 * 2 - 6, 0);
  }
}

export class LongHandLayer extends ClockHandLayer {
  constructor(p5, size, order) {
    super(
      p5,
      size,
      { x: 5, y: 25 },
      order,
      {
        frameWidth: 30,
        frameHeight: 16,
        shaftLength: 25,
        beadsRadius: 6,
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
      { x: 5, y: 25 },
      order,
      {
        frameWidth: 15,
        frameHeight: 8,
        shaftLength: 12,
        beadsRadius: 6,
      },
    );
  }
}
