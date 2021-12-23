import { LanticaGear } from '../LanticaGear';
import { KIRIKO_RADIUS } from '../constants';
import { GearFrameLayout } from './GearFrameLayout';
import { ShortHandLayer, LongHandLayer } from './ClockHandLayers';

export default class Kiriko extends LanticaGear {
  constructor(p5, args) {
    super(p5, { ...args, radius: KIRIKO_RADIUS });
  }

  draw() {
    this._layers.forEach(layer => layer.remove());
    this._layers = [];
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this._layers = [
      new GearFrameLayout(
        this.createGraphics(this.radius * 2, this.radius * 2),
        {
          radius: this.radius,
          innerRadius: this.innerRadius,
          teethCount: this.teethCount,
        },
        0,
      ),
    ];
    this.image(this._layers[0], -this._layers[0].origin.x, -this._layers[0].origin.y);
    this.pop();

    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(Math.PI / 3);
    this._layers = [
      ...this._layers,
      new ShortHandLayer(
        this.createGraphics(this.radius * 2, 50),
        1,
      ),
    ];
    this.image(this._layers[1], -this._layers[1].origin.x, -this._layers[1].origin.y);
    this.pop();

    this.push();
    this.translate(this.translateX, this.translateY);
    this._layers = [
      ...this._layers,
      new LongHandLayer(
        this.createGraphics(this.radius * 2, 50),
        2,
      ),
    ];
    this.image(this._layers[2], -this._layers[2].origin.x, -this._layers[2].origin.y);
    this.pop();
  }
}