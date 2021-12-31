import { YUIKA_RADIUS } from './constants';
import { Clock } from '../abstract/Clock';
import { ClockHandleLayer } from './yuika/ClockHandleLayer';
import { ClockDialLayer, ClockFaceLayer } from './yuika/ClockFaceLayers';
import { ClockLongHandLayer, ClockShortHandLayer, ClockSecondHandLayer } from './yuika/ClockHandLayers';
import { ClockCoverFrameLayer, ClockCoverHingeLayer, ClockCoverSurfaceLayer } from './yuika/ClockCoverLayers';

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
    this._drawCover();
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
    this.translate(0, YUIKA_RADIUS + 55);

    const hingeLayer = new ClockCoverHingeLayer(this);
    const frameLayer = new ClockCoverFrameLayer(this);
    const surfaceLayer = new ClockCoverSurfaceLayer(this);
    hingeLayer.setup();
    frameLayer.setup();
    surfaceLayer.setup();
    this.translate(0, -hingeLayer.translateY);
    this.image(hingeLayer, -hingeLayer.origin.x, -hingeLayer.origin.y);
    this.translate(0, hingeLayer.translateY);
    this.image(surfaceLayer, -surfaceLayer.origin.x, -surfaceLayer.origin.y);
    this.image(frameLayer, -frameLayer.origin.x, -frameLayer.origin.y);
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

