import compose from 'lodash/fp/compose';
import { GearLayer } from '../../gear/GearLayer';
import { LanticaTheme } from '../theme/LanticaTheme';

const ThemedGearLayer = compose(LanticaTheme)(GearLayer);

const SAKUYA_INNER_DIAMETER = 44;
const SAKUYA_ERASE_DIAMETER = 100;
const SAKUYA_INNER_ERASE_DIAMETER = 24;

export class GearOuterLayer extends ThemedGearLayer {
  draw() {
    this.fill(this.primary);
    this.stroke(this.primary);
    this.frame(10, 6);

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
