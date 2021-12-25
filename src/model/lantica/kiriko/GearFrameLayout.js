import { arcs } from '../../gear/GearFrontLayer';
import { LanticaLayerTheme } from '../LanticaLayerTheme';

const KIRIKO_BACK_DIAMETER = 60;
const KIRIKO_ERASE_DIAMETER = 75;

export class GearFrameLayout extends LanticaLayerTheme {
  constructor(p5, { radius, innerRadius, teethCount }, order) {
    super(
      p5,
      { width: radius * 2, height: radius * 2 },
      { x: radius, y: radius },
      order,
    );

    this.draw(radius, innerRadius, teethCount);
  }

  draw(radius, innerRadius, teethCount) {
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

    this.fill(this.primary);
    this.stroke(this.primary);
    arcs(
      radius * 2,
      innerRadius * 2,
      teethCount,
      ({ start, end, radius }) => {
        this.arc(0, 0, radius, radius, start, end, this.PIE);
      },
    );
    this.fill(this.dark);
    this.stroke(this.primary);
    this.ellipse(0, 0, KIRIKO_ERASE_DIAMETER + 5);
    this.erase();
    this.ellipse(0, 0, KIRIKO_ERASE_DIAMETER);
    this.noErase();

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
}
