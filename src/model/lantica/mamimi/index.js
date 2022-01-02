import { LanticaGear } from '../LanticaGear';
import { MAMIMI_RADIUS } from '../constants';
import { GearOuterLayer, GearInnerLayer } from './GearFrameLayers';
import { ShortHandLayer, LongHandLayer } from './ClockHandLayers';

export default class Mamimi extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: MAMIMI_RADIUS });
  }

  get gears() { return this.layers.slice(0, 2); }
  get clockHands() { return this.layers.slice(2); }

  buildLayers() {
    return [
      new GearInnerLayer(
        this,
        this.radius,
        this.teethHeight,
        this.teethCount,
        0,
      ),
      new GearOuterLayer(
        this,
        this.radius,
        this.teethHeight,
        this.teethCount,
        1,
      ),
      new ShortHandLayer(
        this,
        { width: this.radius * 2, height: 50 },
        2,
      ),
      new LongHandLayer(
        this,
        { width: this.radius * 2, height: 50 },
        3,
      ),
    ];
  }
}
