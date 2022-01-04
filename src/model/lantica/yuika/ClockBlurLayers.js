import { P5Layer } from '../../abstract/P5Layer';
import { YUIKA_FACE_RADIUS } from '../constants';

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

  increment() { if (this.blur < MAX_ALPHA) this._blur += 10; }
  decrement() { if (this.blur > MIN_ALPHA) this._blur -= 10; }

  draw(hasPower) {
    hasPower ? this.increment() : this.decrement();

    this.fill(0);
    this.noStroke();
    this.ellipse(0, 0, YUIKA_FACE_RADIUS * 2);
    this.erase(this.blur);
    this.ellipse(0, 0, YUIKA_FACE_RADIUS * 2 + 2);
    this.noErase();
  }
}
