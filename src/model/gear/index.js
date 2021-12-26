import Circle from '../circle/index';
import { GearLayer } from './GearLayer';

const INNER_RADIUS_RATIO = 0.9;

export default class Gear extends Circle {
  _teethHeight = 0;
  _teethCount = 0;

  constructor(p5, args) {
    super(p5, args);

    this._teethHeight = args.teethHeight || this.radius * (1 - INNER_RADIUS_RATIO);
    this._teethCount = args.teethCount || 0;
  }

  get teethHeight() { return this._teethHeight; }
  get teethCount() { return this._teethCount; }
  get innerRadius() { return this.radius - this.teethHeight; }

  minDistance(model) {
    if (model instanceof Gear) {
      return this.innerRadius + model.innerRadius + (this.teethHeight + model.teethHeight) / 2;
    }

    return super.minDistance(model);
  }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this.layers.forEach(layer => {
      this.image(layer, -layer.origin.x, -layer.origin.y);
    });
    this.pop();
  }

  buildLayers() { return [new GearLayer(this, this.radius, this.teethHeight, this.teethCount)]; }
}
