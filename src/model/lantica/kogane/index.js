import { LanticaGear } from '../LanticaGear';
import { KOGANE_RADIUS } from '../constants';
import { GearFrameLayout } from './GearFrameLayout';
import { ShortHandLayer, LongHandLayer } from './ClockHandLayers';

export default class Kogane extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: KOGANE_RADIUS });
  }

  get gear() { return this.layers[0]; }
  get hands() { return this.layers.slice(1); }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this.image(this.gear, -this.gear.origin.x, -this.gear.origin.y);
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
      new GearFrameLayout(
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
