import { LanticaGear } from './LanticaGear';
import { RotateDirection } from '../mixins/Rotatable';
import { degToRad } from '../../utilities';

const KOGANE_RADIUS = 60;
const KOGANE_BACK_DIAMETER = 80;
const KOGANE_ERASE_DIAMETER = 90;

export class Kogane extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: KOGANE_RADIUS });
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
  }

  _drawGear() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);

    this.fill(this.primary);
    this.stroke(this.primary);
    this.ellipse(0, 0, KOGANE_BACK_DIAMETER);

    this.fill(this.dark);
    this.stroke(this.dark);
    this.rect(-KOGANE_ERASE_DIAMETER / 2, -6.5, KOGANE_ERASE_DIAMETER, 13);
    this.rect(-6.5, -KOGANE_ERASE_DIAMETER / 2, 13, KOGANE_ERASE_DIAMETER);

    this.image(this._createGearFront(), -KOGANE_RADIUS, -KOGANE_RADIUS);
  }

  _createGearFront() {
    const g = this.createGraphics(KOGANE_RADIUS * 2, KOGANE_RADIUS * 2);

    g.translate(KOGANE_RADIUS, KOGANE_RADIUS);

    this.drawBlock(g);

    g.fill(this.dark);
    g.stroke(this.primary);
    g.ellipse(0, 0, KOGANE_ERASE_DIAMETER + 5);

    g.erase();
    g.ellipse(0, 0, KOGANE_ERASE_DIAMETER);
    g.noErase();

    g.fill(this.primary);
    g.rect(-KOGANE_ERASE_DIAMETER / 2, -5, KOGANE_ERASE_DIAMETER, 10);
    g.rect(-5, -KOGANE_ERASE_DIAMETER / 2, 10, KOGANE_ERASE_DIAMETER);

    return g;
  }

  _drawLongClockHand() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this._longClockHandRotateAngle);
    this.image(this._createClockHand(KOGANE_ERASE_DIAMETER), -10, -25);
  }

  _drawShortClockHand() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this._shortClockHandRotateAngle);
    this.image(this._createClockHand(KOGANE_ERASE_DIAMETER - 10), -10, -25);
  }

  _createClockHand(length) {
    const g = this.createGraphics(KOGANE_RADIUS * 2, 50);

    g.translate(10, 25)

    g.stroke(this.light);
    g.fill(this.light);
    g.ellipse(0, 0, 14);
    g.stroke(this.primary);
    g.fill(this.primary);
    g.ellipse(0, 0, 10);

    g.stroke(this.light);
    g.fill(this.light);
    g.rect(6, -1, length / 2, 2);

    g.translate(length / 2, 0);
    g.rect(24, -3, 6, 6);
    g.stroke(this.primary);
    g.fill(this.primary);
    g.arc(0, 0, 50, 48, -degToRad(18), degToRad(18));
    g.stroke(this.light);
    g.fill(this.light);
    g.arc(0, 0, 48, 48, -degToRad(20), degToRad(20));
    g.rotate(Math.PI / 4);
    g.rect(-6, -6, 12, 12, 2);
    g.rotate(-Math.PI / 4);
    g.triangle(30, 8, 30, -8, 40, 0);
    g.erase();
    g.triangle(32, 4, 32, -4, 37, 0);
    g.noErase();

    return g;
  }

  get _longClockHandRotateAngle() { return RotateDirection.RIGHT * (this.frameCount / 5); }
  get _shortClockHandRotateAngle() { return RotateDirection.RIGHT * (this.frameCount / 15); }
}
