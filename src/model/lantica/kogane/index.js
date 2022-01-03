import LanticaGear from '../LanticaGear';
import { KOGANE_RADIUS } from '../constants';
import { GearFrameLayer } from './GearFrameLayer';
import { ShortHandLayer, LongHandLayer } from './ClockHandLayers';

export default class Kogane extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: KOGANE_RADIUS });
  }

  get gears() { return this.layers.slice(0, 1); }
  get clockHands() { return this.layers.slice(1); }

  buildLayers() {
    return [
      new GearFrameLayer(
        this,
        this.radius,
        this.teethHeight,
        this.teethCount,
        0,
      ),
      new ShortHandLayer(
        this,
        { width: this.radius * 2, height: 50 },
        1,
      ),
      new LongHandLayer(
        this,
        { width: this.radius * 2, height: 50 },
        2,
      ),
    ];
  }
}
