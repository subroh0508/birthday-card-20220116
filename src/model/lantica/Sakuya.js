import { LanticaGear } from './LanticaGear';

const SAKUYA_RADIUS = 75;
const SAKUYA_INNER_DIAMETER = 50;
const SAKUYA_ERASE_DIAMETER = 105;
const SAKUYA_INNER_ERASE_DIAMETER = 30;

const SAKUYA_GEAR_TEETH_HEIGHT = 12;

export class Sakuya extends LanticaGear {
  constructor(p5, args) {
    super(
      p5,
      {
        ...args,
        radius: SAKUYA_RADIUS,
        teethHeight: SAKUYA_GEAR_TEETH_HEIGHT,
        teethWidthRatio: 0.5,
      },
    );
  }

  draw() {
    this.push();
    this._drawGear();
    this.pop();
  }

  _drawGear() {
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);

    this.image(this._createInnerGear(), -SAKUYA_RADIUS, -SAKUYA_RADIUS);
  }

  _createInnerGear() {
    const g = this.createGraphics(SAKUYA_RADIUS * 2, SAKUYA_RADIUS * 2);

    g.translate(SAKUYA_RADIUS, SAKUYA_RADIUS);

    this.drawBlock(g);

    g.fill(this.dark);
    g.stroke(this.primary);
    g.ellipse(0, 0, SAKUYA_ERASE_DIAMETER + 5);

    g.erase();
    g.ellipse(0, 0, SAKUYA_ERASE_DIAMETER);
    g.noErase();

    const gInner = this.createGraphics(SAKUYA_ERASE_DIAMETER + 5, SAKUYA_ERASE_DIAMETER + 5);

    gInner.translate((SAKUYA_ERASE_DIAMETER + 5) / 2, (SAKUYA_ERASE_DIAMETER + 5) / 2);

    gInner.fill(this.primary);
    gInner.stroke(this.dark);
    gInner.rect(-(SAKUYA_ERASE_DIAMETER + 2) / 2, -6, SAKUYA_ERASE_DIAMETER + 2, 12);
    gInner.rect(-6, -(SAKUYA_ERASE_DIAMETER + 2) / 2, 12, SAKUYA_ERASE_DIAMETER + 2);

    gInner.ellipse(0, 0, SAKUYA_INNER_DIAMETER);
    gInner.ellipse(0, 0, SAKUYA_INNER_ERASE_DIAMETER + 5);

    gInner.erase();
    gInner.ellipse(0, 0, SAKUYA_INNER_ERASE_DIAMETER + 3);
    gInner.noErase();

    g.image(gInner, -(SAKUYA_ERASE_DIAMETER + 5) / 2, -(SAKUYA_ERASE_DIAMETER + 5) / 2);

    return g;
  }
}