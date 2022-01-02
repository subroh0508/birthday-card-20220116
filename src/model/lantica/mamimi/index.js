import { LanticaGear } from '../LanticaGear';
import { MAMIMI_RADIUS } from '../constants';
import { GearOuterLayer, GearInnerLayer } from './GearFrameLayers';
import { ShortHandLayer, LongHandLayer } from './ClockHandLayers';

export default class Mamimi extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: MAMIMI_RADIUS });
  }

  get gears() { return this.layers.slice(0, 2); }
  get hands() { return this.layers.slice(2); }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this.gears.forEach(gear => {
      this.image(gear, -gear.origin.x, -gear.origin.y);
    })
    this.pop();

    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(Math.PI / 3);
    this.image(this.hands[0], -this.hands[0].origin.x, -this.hands[0].origin.y);
    this.pop();

    this.push();
    this.translate(this.translateX, this.translateY);
    this.image(this.hands[1], -this.hands[1].origin.x, -this.hands[1].origin.y);
    this.pop();
  }

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
