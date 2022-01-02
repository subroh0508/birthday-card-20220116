import compose from 'lodash/fp/compose';
import { GearLayer, arcs } from '../../gear/GearLayer';
import { LanticaTheme } from '../theme/LanticaTheme';

const ThemedGearLayer = compose(LanticaTheme)(GearLayer);

const SAKUYA_INNER_DIAMETER = 50;
const SAKUYA_ERASE_DIAMETER = 105;
const SAKUYA_INNER_ERASE_DIAMETER = 30;

export class GearOuterLayer extends ThemedGearLayer {
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
    this.ellipse(0, 0, SAKUYA_ERASE_DIAMETER + 5);

    this.erase();
    this.ellipse(0, 0, SAKUYA_ERASE_DIAMETER);
    this.noErase();
  }
}

export class GearInnerLayer extends ThemedGearLayer {
  draw() {
    this.fill(this.primary);
    this.stroke(this.dark);
    this.rect(-(SAKUYA_ERASE_DIAMETER + 2) / 2, -6, SAKUYA_ERASE_DIAMETER + 2, 12);
    this.rect(-6, -(SAKUYA_ERASE_DIAMETER + 2) / 2, 12, SAKUYA_ERASE_DIAMETER + 2);

    this.ellipse(0, 0, SAKUYA_INNER_DIAMETER);
    this.ellipse(0, 0, SAKUYA_INNER_ERASE_DIAMETER + 5);

    this.erase();
    this.ellipse(0, 0, SAKUYA_INNER_ERASE_DIAMETER + 3);
    this.noErase();
  }
}
