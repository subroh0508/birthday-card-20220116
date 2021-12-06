import { LanticaGear } from './LanticaGear';
import { RotateDirection } from '../mixins/Rotatable';

const MAMIMI_RADIUS = 55;
const MAMIMI_BACK_DIAMETER = 40;
const MAMIMI_INNER_DIAMETER = 80;
const MAMIMI_ERASE_DIAMETER = 75;

export class Mamimi extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: MAMIMI_RADIUS });
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
    this.ellipse(0, 0, MAMIMI_BACK_DIAMETER);

    this.fill(this.dark);
    this.stroke(this.dark);
    this.rect(-MAMIMI_INNER_DIAMETER / 2, -6.5, MAMIMI_INNER_DIAMETER, 13);
    this.rect(-6.5, -MAMIMI_INNER_DIAMETER / 2, 13, MAMIMI_INNER_DIAMETER);

    this.fill(this.primary);
    this.stroke(this.primary);
    this.rect(-MAMIMI_INNER_DIAMETER / 2, -5, MAMIMI_INNER_DIAMETER, 10);
    this.rect(-5, -MAMIMI_INNER_DIAMETER / 2, 10, MAMIMI_INNER_DIAMETER);

    this.image(this._createGearFront(), -MAMIMI_RADIUS, -MAMIMI_RADIUS);
  }


  _createGearFront() {
    const g = this.createGraphics(MAMIMI_RADIUS * 2, MAMIMI_RADIUS * 2);

    g.translate(MAMIMI_RADIUS, MAMIMI_RADIUS);

    this.drawBlock(g);

    g.fill(this.dark);
    g.stroke(this.primary);
    g.ellipse(0, 0, MAMIMI_INNER_DIAMETER);

    g.erase();
    g.ellipse(0, 0, MAMIMI_ERASE_DIAMETER);
    g.noErase();
    
    return g;
  }

  _drawLongClockHand() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this._randomLongHandRotateAngle);
    this.image(this._createClockHand(40, 24, 10), -10, -25);
  }

  _drawShortClockHand() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this._randomShortHandRotateAngle);
    this.image(this._createClockHand(35, 20, 8), -10, -25);
  }

  _createClockHand(length, width, holeDiameter) {
    const g = this.createGraphics(MAMIMI_RADIUS * 2, 50);

    g.translate(10, 25)

    g.stroke(this.light);
    g.fill(this.light);
    g.ellipse(0, 0, 14);
    g.stroke(this.primary);
    g.fill(this.primary);
    g.ellipse(0, 0, 10);

    g.stroke(this.light);
    g.fill(this.light);
    g.rect(6, -2, length, 4);

    g.translate(length, 0);
    g.stroke(this.light);
    g.fill(this.light);
    g.rotate(Math.PI / 4);
    g.rect(-6, -6, 12, 12, 2);
    g.rotate(-Math.PI / 4);
    g.rect(6, -3, 6, 6);
    g.triangle(6, 0, width + 6, width / 2, width + 6, -(width / 2));
    g.triangle(width + 6, width / 2, width + 6, -(width / 2), width * 2 + 6, 0);
    g.erase();
    g.ellipse(width + 6, 0, holeDiameter);
    g.noErase();

    return g;
  }

  _current = [
    { angle: 0, speed: 0.05, rotate: RotateDirection.LEFT, period: 50 },
    { angle: 0.15, speed: 0.05, rotate: RotateDirection.RIGHT, period: 100 },
  ];

  get _angleParams() {
    return {
      speed: Math.random() * (0.05 - 0.0001) + 0.0001,
      rotate: Math.random() < 0.5 ? RotateDirection.LEFT : RotateDirection.RIGHT,
    }
  }

  get _randomLongHandRotateAngle() { return this._randomRotationAngle(0); }
  get _randomShortHandRotateAngle() { return this._randomRotationAngle(1); }

  _randomRotationAngle(n) {
    let current = this._current[n];
    if (!(this.frameCount % current.period)) {
      current = { ...current, ...this._angleParams };
      this._current[n] = current;
    }

    current.angle += current.rotate * current.speed;
    return current.angle;
  }
}
