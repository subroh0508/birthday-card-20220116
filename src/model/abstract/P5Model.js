import { genUniqId } from '../../utilities';

export class P5Model {
  _layers = [];

  constructor(p5, _) {
    Object.setPrototypeOf(P5Model.prototype, p5);
    this.id = genUniqId();
  }

  get layers() { return this._layers; }
  get needPower() { return false; }

  setup() {
    const layers = this.buildLayers();
    layers.forEach(layer => layer.setup());
    this._layers = layers;
  }

  draw() {
    this.push();
    this.drawLayers();
    this.pop();
  }

  drawLayers() { this.layers.forEach(layer => this.image(layer, -layer.origin.x, -layer.origin.y)); }

  includes(_x, _y) { return false; }
  buildLayers() { return []; }
}
