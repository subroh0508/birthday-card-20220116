import { LanticaGear } from './LanticaGear';
import { RotateDirection } from '../mixins/Rotatable';

const KIRIKO_RADIUS = 55;
const KIRIKO_BACK_DIAMETER = 60;
const KIRIKO_ERASE_DIAMETER = 75;

const KIRIKO_DIAMOND_FRAME_WIDTH_LARGE = 30;
const KIRIKO_DIAMOND_FRAME_HEIGHT_LARGE = 16;
const KIRIKO_DIAMOND_SHAFT_LENGTH_LARGE = 25;
const KIRIKO_DIAMOND_BEADS_RADIUS_LARGE = 6;
const KIRIKO_DIAMOND_FRAME_WIDTH_SMALL = 15;
const KIRIKO_DIAMOND_FRAME_HEIGHT_SMALL = 8;
const KIRIKO_DIAMOND_SHAFT_LENGTH_SMALL = 12;
const KIRIKO_DIAMOND_BEADS_RADIUS_SMALL = 6;

export class Kiriko extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: KIRIKO_RADIUS });
  }

  draw() {
    this.push();
    this._drawGear();
    this.pop();

    this.push();
    this._drawLongClockHand();
    this.pop();

    this.push();
    this._drawShortClockHand();
    this.pop();

    this.push();
    this.fill(this.primary);
    this.stroke(this.primary);
    this.translate(this.translateX, this.translateY);
    this.ellipse(0, 0, 2);
    this.pop();
  }

  _drawGear() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);

    this.fill(this.primary);
    this.stroke(this.primary);
    this.ellipse(0, 0, KIRIKO_BACK_DIAMETER);

    this.fill(this.dark);
    this.stroke(this.dark);
    [...Array(5)].forEach(() => {
      this.rotate(2 * Math.PI / 5);
      this.rect(KIRIKO_BACK_DIAMETER / 2 - 2, -6.5, 15, 13);
    });
    this.rotate(0);

    this.image(this._createGearFront(), -KIRIKO_RADIUS, -KIRIKO_RADIUS);

    this.fill(this.primary);
    this.stroke(this.dark);
    this.ellipse(0, 0, KIRIKO_BACK_DIAMETER);
    this.ellipse(0, 0, KIRIKO_BACK_DIAMETER - 10);
    this.fill(this.primary);
    this.stroke(this.primary);
    [...Array(5)].forEach((_, i) => {
      this.rotate(2 * Math.PI / 5);
      this.rect(KIRIKO_BACK_DIAMETER / 2 - 2, -5, 15, 10);
    });
  }

  _createGearFront() {
    const g = this.createGraphics(KIRIKO_RADIUS * 2, KIRIKO_RADIUS * 2);

    g.translate(KIRIKO_RADIUS, KIRIKO_RADIUS);

    this.drawBlock(g);

    g.fill(this.dark);
    g.stroke(this.primary);
    g.ellipse(0, 0, KIRIKO_ERASE_DIAMETER + 5);

    g.erase();
    g.ellipse(0, 0, KIRIKO_ERASE_DIAMETER);
    g.noErase();

    return g;
  }

  _drawLongClockHand() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this._longClockHandRotateAngle);
    this.image(this._createClockHand(this._longClockHandParams), -5, -25);
  }

  _drawShortClockHand() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this._shortClockHandRotateAngle);
    this.image(this._createClockHand(this._shortClockHandParams), -5, -25);
  }

  _shortClockHandParams = {
    frameWidth: KIRIKO_DIAMOND_FRAME_WIDTH_SMALL,
    frameHeight: KIRIKO_DIAMOND_FRAME_HEIGHT_SMALL,
    shaftLength: KIRIKO_DIAMOND_SHAFT_LENGTH_SMALL,
    beadsRadius: KIRIKO_DIAMOND_BEADS_RADIUS_SMALL,
  };
  _longClockHandParams = {
    frameWidth: KIRIKO_DIAMOND_FRAME_WIDTH_LARGE,
    frameHeight: KIRIKO_DIAMOND_FRAME_HEIGHT_LARGE,
    shaftLength: KIRIKO_DIAMOND_SHAFT_LENGTH_LARGE,
    beadsRadius: KIRIKO_DIAMOND_BEADS_RADIUS_LARGE,
  };

  _createClockHand(params) {
    const g = this.createGraphics(KIRIKO_RADIUS * 2, 50);

    g.translate(5, 25)

    g.stroke(this.light);
    g.fill(this.light);
    g.ellipse(0, 0, 6);

    this._drawDiamondFrame(
      g,
      params.frameWidth,
      params.frameHeight,
      params.shaftLength,
      params.beadsRadius,
    );

    g.translate(params.beadsRadius, 0);
    this._drawDiamond(g);

    return g;
  }

  _drawDiamondFrame(g, width, height, shaftLength, beadsRadius) {
    const hOffset = height / 2 - 3;

    g.translate(3, 0);
    g.triangle(0, 0, width / 2, height / 2, width / 2, -height / 2);
    g.triangle(width / 2, height / 2, width / 2, -height / 2, width , 0);
    g.rect(width - 6, -1, shaftLength, 2);
    g.translate(5, 0);
    g.erase();
    g.triangle(0, 0, width / 2 - 5, hOffset, width / 2 - 5, -hOffset);
    g.triangle(width / 2 - 5, hOffset, width / 2 - 5, -hOffset, width - 5 * 2, 0);
    g.noErase();

    g.stroke(this.light);
    g.fill(this.light);
    g.translate(width + shaftLength - 9, 0);
    g.ellipse(0, 0, beadsRadius);
    g.ellipse(beadsRadius, 0, beadsRadius);
  }

  _drawDiamond(g) {
    g.stroke(this.light);
    g.fill(this.light);
    g.triangle(0, 0, 15, 10, 15, -10);
    g.triangle(15, 10, 15, -10, 18 * 2, 0);
    g.stroke(this.primary);
    g.fill(this.light);
    g.translate(3, 0);
    g.triangle(0, 0, 15 - 3, 8, 15 - 3, -8);
    g.triangle(15 - 3, 8, 15 - 3, -8, 18 * 2 - 6, 0);
  }

  get _longClockHandRotateAngle() { return RotateDirection.LEFT * (this.frameCount / 20); }
  get _shortClockHandRotateAngle() { return RotateDirection.LEFT * (this.frameCount / 30); }
}
