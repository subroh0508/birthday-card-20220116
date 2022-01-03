import compose from 'lodash/fp/compose';
import { P5Layer } from '../../abstract/P5Layer';
import { YUIKA_RADIUS } from '../constants';
import { ClockTheme } from '../theme/ClockTheme';

const ThemedLayer = compose(ClockTheme)(P5Layer);

const YUIKA_COVER_HEIGHT = 120;
const YUIKA_COVER_DEPTH = 40;
const YUIKA_COVER_HINGE_HEIGHT = 40;
const YUIKA_COVER_HINGE_WIDTH = 150;
const YUIKA_COVER_HINGE_POSITION_Y = YUIKA_COVER_HINGE_HEIGHT + 15;
const YUIKA_COVER_THICKNESS = 30;
const YUIKA_COVER_SURFACE_WIDTH = YUIKA_RADIUS * 2 - 20;
const YUIKA_COVER_SURFACE_HEIGHT = 100;

export class ClockCoverFrameLayer extends ThemedLayer {
  constructor(p5, order) {
    super(
      p5,
      { width: YUIKA_RADIUS * 2, height: YUIKA_COVER_HEIGHT + YUIKA_COVER_DEPTH },
      { x: YUIKA_RADIUS, y: YUIKA_COVER_HEIGHT / 2 },
      order,
    );
  }

  get translateY() { return -YUIKA_COVER_HINGE_POSITION_Y; }

  draw() {
    this.fill(this.primary);
    this.stroke(this.dark);
    this.arc(0, 0, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT + YUIKA_COVER_DEPTH * 2, 0, Math.PI);
    this.arc(0, 0, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI - Math.PI / 60, Math.PI / 60);
    this.arc(0, YUIKA_COVER_THICKNESS, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI + Math.PI / 60, -Math.PI / 60);
    this.erase();
    this.arc(0, YUIKA_COVER_THICKNESS + 1, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI + Math.PI / 60, -Math.PI / 60);
    this.noErase();
    this.arc(0, 0, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI / 60, Math.PI - Math.PI / 60);
    this.erase();
    this.arc(0, -1, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI / 60, Math.PI - Math.PI / 60);
    this.noErase();

    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2, -YUIKA_COVER_HEIGHT / 2, YUIKA_COVER_HINGE_WIDTH, 2);
    this.erase();
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2, -YUIKA_COVER_HEIGHT / 2 - 1, YUIKA_COVER_HINGE_WIDTH, 2);
    this.noErase();
    this.fill(this.primary);
    this.stroke(this.primary);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2, -39, YUIKA_COVER_HINGE_WIDTH, 10);
    this.stroke(this.dark);
    this.arc(0, -32, YUIKA_COVER_HINGE_WIDTH, 20, Math.PI / 60, Math.PI - Math.PI / 60);
  }
}

export class ClockCoverHingeLayer extends ThemedLayer {
  constructor(p5, order) {
    super(
      p5,
      { width: YUIKA_COVER_HINGE_WIDTH, height: YUIKA_COVER_HINGE_HEIGHT },
      { x: YUIKA_COVER_HINGE_WIDTH / 2, y: 0 },
      order,
    );
  }

  get translateY() { return YUIKA_COVER_HINGE_HEIGHT; }

  draw() {
    this.fill(0);
    this.stroke(0);
    this.rect(-25, 5, 50, 30);
    this.fill(this.light);
    this.stroke(this.light);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2 + 20, 5, YUIKA_COVER_HINGE_WIDTH / 2 - 35, 12);
    this.rect(15, 5, YUIKA_COVER_HINGE_WIDTH / 2 - 35, 12);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2 + 20, 18, YUIKA_COVER_HINGE_WIDTH / 2 - 45, 20);
    this.rect(25, 18, YUIKA_COVER_HINGE_WIDTH / 2 - 45, 20);
    this.fill(this.primary);
    this.stroke(this.primary);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2 + 21, 6, YUIKA_COVER_HINGE_WIDTH / 2 - 38, 10);
    this.rect(17, 6, YUIKA_COVER_HINGE_WIDTH / 2 - 38, 10);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2 + 21, 16, YUIKA_COVER_HINGE_WIDTH / 2 - 48, 20);
    this.rect(27, 16, YUIKA_COVER_HINGE_WIDTH / 2 - 48, 20);
    this.stroke(this.dark);
    this.rect(8, 20, 14, 20);
    this.rect(-22, 20, 14, 20);
    this.fill(this.dark);
    this.rect(-6, 16, 12, 12);
    this.ellipse(0, 28, 12);
  }
}

export class ClockCoverSurfaceLayer extends ThemedLayer {
  constructor(p5, order) {
    super(
      p5,
      { width: YUIKA_COVER_SURFACE_WIDTH, height: YUIKA_COVER_SURFACE_HEIGHT },
      { x: YUIKA_COVER_SURFACE_WIDTH / 2, y: YUIKA_COVER_SURFACE_HEIGHT / 2 - 10 },
      order,
    );
  }

  get translateY() { return -YUIKA_COVER_HINGE_POSITION_Y; }

  setup() { this.draw(); }

  draw() {
    this.background(0);
    this.fill(this.primary);
    this.stroke(this.light);
    [...Array(Math.floor(YUIKA_COVER_SURFACE_HEIGHT / 10) + 2)].forEach((_, i) => {
      [...Array(Math.floor(YUIKA_COVER_SURFACE_WIDTH / 40) + 2)].forEach((_, j) => {
        const [x, y] = [YUIKA_COVER_SURFACE_WIDTH - j * 40, YUIKA_COVER_SURFACE_HEIGHT - i * 10];
        [...Array(2)].forEach((_, n) => {
          this.ellipse(x, y, 80 - n * 10, 20 - n * 10);
        })
      });
    });
    this.erase();
    this.triangle(0, 0, 70, 0, 0, 40);
    this.triangle(0, YUIKA_COVER_SURFACE_HEIGHT, 65, YUIKA_COVER_SURFACE_HEIGHT, 0, YUIKA_COVER_SURFACE_HEIGHT - 40);
    this.triangle(YUIKA_COVER_SURFACE_WIDTH, YUIKA_COVER_SURFACE_HEIGHT, YUIKA_COVER_SURFACE_WIDTH - 65, YUIKA_COVER_SURFACE_HEIGHT, YUIKA_COVER_SURFACE_WIDTH, YUIKA_COVER_SURFACE_HEIGHT - 40);
    this.triangle(YUIKA_COVER_SURFACE_WIDTH, 0, YUIKA_COVER_SURFACE_WIDTH - 70, 0, YUIKA_COVER_SURFACE_WIDTH, 40);
    this.noErase();
  }
}
