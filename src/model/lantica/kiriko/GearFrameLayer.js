import compose from 'lodash/fp/compose';
import { GearLayer } from '../../gear/GearLayer';
import { LanticaTheme } from '../theme/LanticaTheme';

const ThemedGearLayer = compose(LanticaTheme)(GearLayer);

const KIRIKO_BACK_DIAMETER = 60;
const KIRIKO_ERASE_DIAMETER = 75;

export class GearFrameLayer extends ThemedGearLayer {
  draw() {
    this.fill(this.primary);
    this.stroke(this.primary);
    this.ellipse(0, 0, KIRIKO_BACK_DIAMETER);

    this.fill(this.dark);
    this.stroke(this.dark);
    [...Array(5)].forEach(() => {
      this.rotate(2 * Math.PI / 5);
      this.rect(KIRIKO_BACK_DIAMETER / 2 - 2, -6.5, 15, 13);
    });

    this.fill(this.primary);
    this.stroke(this.primary);
    this.frame(this.teethWidth, this.teethWidth - 2);

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
