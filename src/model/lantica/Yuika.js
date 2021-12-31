import { Clock, ROMAN_NUMBER_GRAPHIC_SIZE } from '../abstract/Clock';
import { ClockHandleLayer } from './yuika/ClockHandleLayer';
import { ClockDialLayer, ClockFaceLayer } from './yuika/ClockFaceLayers';

const YUIKA_RADIUS = 300;
const YUIKA_FACE_RADIUS = 260;
const YUIKA_FACE_INNER_CIRCLE_RADIUS = 35;
const YUIKA_COVER_HEIGHT = 120;
const YUIKA_COVER_HINGE_WIDTH = 150;
const YUIKA_COVER_THICKNESS = 30;
const YUIKA_COVER_SURFACE_WIDTH = YUIKA_RADIUS * 2 - 20;
const YUIKA_COVER_SURFACE_HEIGHT = 100;
const YUIKA_LONG_HAND_LENGTH = YUIKA_FACE_RADIUS - ROMAN_NUMBER_GRAPHIC_SIZE - 30;
const YUIKA_SHORT_HAND_LENGTH = YUIKA_LONG_HAND_LENGTH - 70;
const YUIKA_LONG_HAND_WIDTH = 14;
const YUIKA_SHORT_HAND_WIDTH = 60;
const YUIKA_SECOND_HAND_LENGTH = YUIKA_LONG_HAND_LENGTH + YUIKA_FACE_INNER_CIRCLE_RADIUS;

const YUIKA_CLOCK_COLOR_PRIMARY = '#EBA761';
const YUIKA_CLOCK_COLOR_LIGHT = '#D8DFC5';
const YUIKA_CLOCK_COLOR_DARK = '#5E3C2D';
const YUIKA_CLOCK_HAND_COLOR = '#9C7A74';

export class Yuika extends Clock {
  constructor(p5, args) {
    super(p5, { ...args, radius: YUIKA_RADIUS });
  }

  draw() {
    this._drawClock();
    this._drawHands();
  }

  _drawClock() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this._drawHandle();
    this._drawFace();
    //this._drawCover();
    this.pop();
  }

  _drawHandle() {
    const layer = new ClockHandleLayer(this);
    layer.setup();
    this.translate(0, -YUIKA_RADIUS - layer.translateY);
    this.image(layer, -layer.origin.x, -layer.origin.y);
    this.translate(0, YUIKA_RADIUS + layer.translateY);
  }

  _drawFace() {
    const faceLayer = new ClockFaceLayer(this);
    const dialLayer = new ClockDialLayer(this);
    faceLayer.setup();
    dialLayer.setup();
    this.image(faceLayer, -faceLayer.origin.x, -faceLayer.origin.y);
    this.image(dialLayer, -dialLayer.origin.x, -dialLayer.origin.y);
  }

  _drawCover() {
    const gFrame = this.createGraphics(YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT + 85);

    gFrame.translate(YUIKA_RADIUS, YUIKA_COVER_HEIGHT / 2 + 85);
    gFrame.fill(YUIKA_CLOCK_COLOR_PRIMARY);
    gFrame.stroke(YUIKA_CLOCK_COLOR_DARK);
    gFrame.arc(0, 0, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT + 80, Math.PI, 0);
    gFrame.ellipse(0, 0, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT);
    gFrame.rect(-YUIKA_COVER_HINGE_WIDTH / 2, YUIKA_COVER_HEIGHT / 2 - 2, YUIKA_COVER_HINGE_WIDTH, 10);
    gFrame.arc(0, -YUIKA_COVER_THICKNESS, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI / 60, Math.PI - Math.PI / 60);
    gFrame.erase();
    gFrame.arc(0, -YUIKA_COVER_THICKNESS - 1, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI / 60, Math.PI - Math.PI / 60);
    gFrame.noErase();
    gFrame.arc(0, 0, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI + Math.PI / 60, -Math.PI / 60);
    gFrame.erase();
    gFrame.arc(0, 1, YUIKA_RADIUS * 2, YUIKA_COVER_HEIGHT, Math.PI + Math.PI / 60, -Math.PI / 60);
    gFrame.noErase();
    gFrame.erase();
    gFrame.rect(-YUIKA_COVER_HINGE_WIDTH / 2, YUIKA_COVER_HEIGHT / 2 - 1, YUIKA_COVER_HINGE_WIDTH, 10);
    gFrame.noErase();
    gFrame.fill(YUIKA_CLOCK_COLOR_PRIMARY);
    gFrame.stroke(YUIKA_CLOCK_COLOR_PRIMARY);
    gFrame.rect(-YUIKA_COVER_HINGE_WIDTH / 2, 29, YUIKA_COVER_HINGE_WIDTH, 10);
    gFrame.stroke(YUIKA_CLOCK_COLOR_DARK);
    gFrame.arc(0, 32, YUIKA_COVER_HINGE_WIDTH, 20, Math.PI + Math.PI / 60, -Math.PI / 60);

    const gSurface = this.createGraphics(YUIKA_COVER_SURFACE_WIDTH, YUIKA_COVER_SURFACE_HEIGHT);
    gSurface.background(0);
    gSurface.fill(YUIKA_CLOCK_COLOR_PRIMARY);
    gSurface.stroke(YUIKA_CLOCK_COLOR_LIGHT);
    [...Array(Math.floor(YUIKA_COVER_SURFACE_HEIGHT / 10) + 2)].forEach((_, i) => {
      [...Array(Math.floor(YUIKA_COVER_SURFACE_WIDTH / 40) + 2)].forEach((_, j) => {
        const [x, y] = [YUIKA_COVER_SURFACE_WIDTH - j * 40, YUIKA_COVER_SURFACE_HEIGHT - i * 10];
        [...Array(2)].forEach((_, n) => {
          gSurface.ellipse(x, y, 80 - n * 10, 20 - n * 10);
        })
      });
    });
    gSurface.erase();
    gSurface.triangle(0, 0, 50, 0, 0, 40);
    gSurface.triangle(0, YUIKA_COVER_SURFACE_HEIGHT, 65, YUIKA_COVER_SURFACE_HEIGHT, 0, YUIKA_COVER_SURFACE_HEIGHT - 30);
    gSurface.triangle(YUIKA_COVER_SURFACE_WIDTH, YUIKA_COVER_SURFACE_HEIGHT, YUIKA_COVER_SURFACE_WIDTH - 65, YUIKA_COVER_SURFACE_HEIGHT, YUIKA_COVER_SURFACE_WIDTH, YUIKA_COVER_SURFACE_HEIGHT - 30);
    gSurface.triangle(YUIKA_COVER_SURFACE_WIDTH, 0, YUIKA_COVER_SURFACE_WIDTH - 50, 0, YUIKA_COVER_SURFACE_WIDTH, 40);
    gSurface.noErase();

    this.translate(0, -YUIKA_RADIUS);
    this.fill(0);
    this.stroke(0);
    this.rect(-25, 5, 50, 30);
    this.fill(YUIKA_CLOCK_COLOR_LIGHT);
    this.stroke(YUIKA_CLOCK_COLOR_LIGHT);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2 + 20, 25, YUIKA_COVER_HINGE_WIDTH / 2 - 35, 12);
    this.rect(15, 25, YUIKA_COVER_HINGE_WIDTH / 2 - 35, 12);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2 + 20, 5, YUIKA_COVER_HINGE_WIDTH / 2 - 45, 20);
    this.rect(25, 5, YUIKA_COVER_HINGE_WIDTH / 2 - 45, 20);
    this.fill(YUIKA_CLOCK_COLOR_PRIMARY);
    this.stroke(YUIKA_CLOCK_COLOR_PRIMARY);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2 + 21, 26, YUIKA_COVER_HINGE_WIDTH / 2 - 38, 10);
    this.rect(17, 26, YUIKA_COVER_HINGE_WIDTH / 2 - 38, 10);
    this.rect(-YUIKA_COVER_HINGE_WIDTH / 2 + 21, 6, YUIKA_COVER_HINGE_WIDTH / 2 - 48, 20);
    this.rect(27, 6, YUIKA_COVER_HINGE_WIDTH / 2 - 48, 20);
    this.stroke(YUIKA_CLOCK_COLOR_DARK);
    this.rect(8, 0, 14, 20);
    this.rect(-22, 0, 14, 20);
    this.fill(YUIKA_CLOCK_COLOR_DARK);
    this.rect(-6, 16, 12, 12);
    this.ellipse(0, 14, 12);

    this.translate(0, -YUIKA_COVER_THICKNESS - 20);
    this.image(gSurface, -YUIKA_COVER_SURFACE_WIDTH / 2, -60);
    this.image(gFrame, -YUIKA_RADIUS, -YUIKA_COVER_HEIGHT / 2 - 85);
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

