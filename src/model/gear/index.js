import { Circle } from '../abstract/Circle';
import { FrontLayer } from "./FrontLayer";

const INNER_RADIUS_RATIO = 0.9;

export default class Gear extends Circle {
  _layers = [];

  _teethHeight = 0;

  constructor(p5, args) {
    super(p5, args);

    this._teethHeight = this.radius * (1 - INNER_RADIUS_RATIO);
    this._layers = [
      new FrontLayer(
        p5,
        {
          radius: this.radius,
          innerRadius: this.innerRadius,
          teethCount: args.teethCount,
        },
      ),
    ]
  }

  get innerRadius() { return this.radius - this.teethHeight; }
  get innerDiameter() { return this.innerRadius * 2; }
  get teethHeight() { return this._teethHeight; }

  minDistance(model) {
    if (model instanceof Gear) {
      return this.innerRadius + model.innerRadius + (this.teethHeight + model.teethHeight) / 2;
    }

    return super.minDistance(model);
  }

  draw() {
    this.push();
    this.rotate(this.rotationAngle);
    this._layers.forEach(layer => {
      this.image(layer, this.translateX - layer.origin.x, this.translateY - layer.origin.y);
    });
    this.pop();
  }
}
