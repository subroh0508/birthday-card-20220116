import Circle from '../circle/index';
import { UmbrellaLayer } from "./UmbrellaLayer";

export default class Umbrella extends Circle {
  _boneCount = 0;
  _color = {};

  constructor(p5, args) {
    super(p5, args);

    this._boneCount = args.boneCount;
    this._color = args.color;
  }

  get boneCount() { return this._boneCount; }
  get color() { return this._color; }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this.layers.forEach(layer => {
      this.image(layer, -layer.origin.x, -layer.origin.y);
    });
    this.pop();
  }

  buildLayers() {
    return [
      new UmbrellaLayer(
        this,
        this.radius,
        this.boneCount,
        this.color,
      ),
    ]
  }
}
