import { Circle } from '../abstract/Circle';
import { FrontLayer } from "./FrontLayer";

const INNER_RADIUS_RATIO = 0.9;

export default class Gear extends Circle {
  _layers = [];

  _teethHeight = 0;
  _teethCount = 0;

  constructor(p5, args) {
    super(p5, args);

    this._teethHeight = this.radius * (1 - INNER_RADIUS_RATIO);
    this._teethCount = args.teethCount;
  }

  setup() {
    this._layers = [
      new FrontLayer(
        this.createGraphics(this.radius * 2, this.radius * 2),
        {
          radius: this.radius,
          innerRadius: this.innerRadius,
          teethCount: this.teethCount,
        },
      ),
    ];
  }

  get innerRadius() { return this.radius - this.teethHeight; }
  get innerDiameter() { return this.innerRadius * 2; }
  get teethHeight() { return this._teethHeight; }
  get teethCount() { return this._teethCount; }

  minDistance(model) {
    if (model instanceof Gear) {
      return this.innerRadius + model.innerRadius + (this.teethHeight + model.teethHeight) / 2;
    }

    return super.minDistance(model);
  }

  draw() {
    this.push();
    this._layers.forEach(layer => {
      this.translate(this.translateX, this.translateY);
      this.rotate(this.rotationAngle);
      this.image(layer, -layer.origin.x, -layer.origin.y);
    });
    this.pop();
  }
}
