import compose from 'lodash/fp/compose';
import { GearLayer, arcs } from '../../gear/GearLayer';
import { LanticaTheme } from '../theme/LanticaTheme';

const ThemedGearLayer = compose(LanticaTheme)(GearLayer);

const KOGANE_BACK_DIAMETER = 80;
const KOGANE_ERASE_DIAMETER = 90;

export class GearFrameLayer extends ThemedGearLayer {
  draw() {
    this.fill(this.primary);
    this.stroke(this.primary);
    arcs(
      this.radius * 2,
      this.innerRadius * 2,
      this.teethCount,
      ({ start, end, radius }) => {
        this.arc(0, 0, radius, radius, start, end, this.PIE);
      },
    );

    this.fill(this.dark);
    this.stroke(this.primary);
    this.ellipse(0, 0, KOGANE_ERASE_DIAMETER + 6);

    this.erase();
    this.ellipse(0, 0, KOGANE_ERASE_DIAMETER);
    this.noErase();

    this.fill(this.primary);
    this.stroke(this.primary);
    this.ellipse(0, 0, KOGANE_BACK_DIAMETER);

    this.fill(this.dark);
    this.stroke(this.dark);
    this.rect(-KOGANE_ERASE_DIAMETER / 2, -6.5, KOGANE_ERASE_DIAMETER, 13);
    this.rect(-6.5, -KOGANE_ERASE_DIAMETER / 2, 13, KOGANE_ERASE_DIAMETER);

    this.fill(this.primary);
    this.stroke(this.primary);
    this.rect(-KOGANE_ERASE_DIAMETER / 2 - 4, -5, KOGANE_ERASE_DIAMETER + 8, 10);
    this.rect(-5, -KOGANE_ERASE_DIAMETER / 2 - 4, 10, KOGANE_ERASE_DIAMETER + 8);
  }
}
