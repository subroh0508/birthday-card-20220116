import { LanticaGear } from '../LanticaGear';
import { KIRIKO_RADIUS } from '../constants';
import { GearFrameLayout } from './GearFrameLayout';
import { ShortHandLayer, LongHandLayer } from './ClockHandLayers';

export default class Kiriko extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: KIRIKO_RADIUS });
  }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this.image(this.layers[0], -this.layers[0].origin.x, -this.layers[0].origin.y);
    this.pop();

    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(Math.PI / 3);
    this.image(this.layers[1], -this.layers[1].origin.x, -this.layers[1].origin.y);
    this.pop();

    this.push();
    this.translate(this.translateX, this.translateY);
    this.image(this.layers[2], -this.layers[2].origin.x, -this.layers[2].origin.y);
    this.pop();
  }

  buildLayers() {
    return [
      new GearFrameLayout(
        this,
        {
          radius: this.radius,
          innerRadius: this.innerRadius,
          teethCount: this.teethCount,
        },
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