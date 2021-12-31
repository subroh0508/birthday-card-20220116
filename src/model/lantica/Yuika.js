import { Clock } from '../abstract/Clock';
import { ClockHandleLayer } from './yuika/ClockHandleLayer';
import { ClockDialLayer, ClockFaceLayer } from './yuika/ClockFaceLayers';
import { ClockLongHandLayer, ClockShortHandLayer, ClockSecondHandLayer } from './yuika/ClockHandLayers';

const YUIKA_RADIUS = 300;
const YUIKA_COVER_HEIGHT = 120;
const YUIKA_COVER_HINGE_WIDTH = 150;
const YUIKA_COVER_THICKNESS = 30;
const YUIKA_COVER_SURFACE_WIDTH = YUIKA_RADIUS * 2 - 20;
const YUIKA_COVER_SURFACE_HEIGHT = 100;

const YUIKA_CLOCK_COLOR_PRIMARY = '#EBA761';
const YUIKA_CLOCK_COLOR_LIGHT = '#D8DFC5';
const YUIKA_CLOCK_COLOR_DARK = '#5E3C2D';

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
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(angle - Math.PI / 2);
    const layer = new ClockLongHandLayer(this);
    layer.setup();
    this.image(layer, -layer.origin.x, -layer.origin.y);
    this.pop();
  }

  _drawShortHand(angle) {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(angle - Math.PI / 2);
    const layer = new ClockShortHandLayer(this);
    layer.setup();
    this.image(layer, -layer.origin.x, -layer.origin.y);
    this.pop();
  }

  _drawSecondHand(angle) {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(angle - Math.PI / 2);
    const layer = new ClockSecondHandLayer(this);
    layer.setup();
    this.image(layer, -layer.origin.x, -layer.origin.y);
    this.pop();
  }
}

