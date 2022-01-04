import { P5Layer } from '../../abstract/P5Layer';
import { YUIKA_FACE_RADIUS } from '../constants';
import { ClockFaceLayer } from "./ClockFaceLayers";
import { ClockHandleLayer } from "./ClockHandleLayer";
import { ClockCoverFrameLayer } from "./ClockCoverLayers";

const MIN_BLUR_ALPHA = 150;
const MIN_ALPHA = 0;
const MAX_ALPHA = 255;

const BLUR_DIFF = 10;
const ALPHA_DIFF = (MAX_ALPHA - MIN_ALPHA) * (BLUR_DIFF / (MAX_ALPHA - MIN_BLUR_ALPHA));

export class ClockBlurLayer extends P5Layer {
  _blur = MIN_BLUR_ALPHA;
  _blind = MIN_ALPHA;

  constructor(p5, order) {
    const size = [
      ClockHandleLayer.SIZE,
      ClockFaceLayer.SIZE,
      ClockCoverFrameLayer.SIZE,
    ].reduce((acc, { width, height }) => {
      return {
        width: width < acc.width ? acc.width : width,
        height: height + acc.height,
      };
    }, { width: 0, height: 0 });

    const origin = {
      x: size.width / 2,
      y: ClockHandleLayer.SIZE.height + ClockFaceLayer.ORIGIN.y,
    }

    super(p5, size, origin, order);
  }

  get blur() { return this._blur; }
  get blindAlpha() { return this._blind; }

  next(hasPower) {
    hasPower ? this.lighten() : this.darken();

    this.draw();
  }

  lighten() {
    if (this.blur < MAX_ALPHA) {
      this._blur += BLUR_DIFF;
    }

    if (this.blindAlpha < MAX_ALPHA) {
      this._blind += ALPHA_DIFF;
    }
  }
  darken() {
    if (this.blur > MIN_BLUR_ALPHA) {
      this._blur -= BLUR_DIFF;
    }

    if (this.blindAlpha > MIN_ALPHA) {
      this._blind -= ALPHA_DIFF;
    }
  }

  draw() {
    this.fill(0);
    this.noStroke();
    this.rect(-this.origin.x, -this.origin.y, this.size.width, this.size.height);
    this.erase(this.blindAlpha);
    this.rect(-this.origin.x, -this.origin.y, this.size.width, this.size.height);
    this.noErase();
    this.ellipse(0, 0, YUIKA_FACE_RADIUS * 2);
    this.erase(this.blur);
    this.ellipse(0, 0, YUIKA_FACE_RADIUS * 2 + 2);
    this.noErase();
  }
}
