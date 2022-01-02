import compose from 'lodash/fp/compose';
import { GearLayer } from '../../gear/GearLayer';
import { LanticaTheme } from '../theme/LanticaTheme';

const ThemedGearLayer = compose(LanticaTheme)(GearLayer);

const MAMIMI_BACK_DIAMETER = 40;
const MAMIMI_INNER_DIAMETER = 80;
const MAMIMI_ERASE_DIAMETER = 75;

export class GearOuterLayer extends ThemedGearLayer {
  draw() {
    this.fill(this.primary);
    this.stroke(this.primary);
    this.frame(this.teethWidth, this.teethWidth - 2);

    this.fill(this.dark);
    this.stroke(this.primary);
    this.ellipse(0, 0, MAMIMI_INNER_DIAMETER);

    this.erase();
    this.ellipse(0, 0, MAMIMI_ERASE_DIAMETER);
    this.noErase();
  }
}

export class GearInnerLayer extends ThemedGearLayer {
  draw() {
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
  }
}
