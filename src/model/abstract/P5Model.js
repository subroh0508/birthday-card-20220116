import { genUniqId } from '../../utilities';
import { GearLayer } from "../gear/GearLayer";

export class P5Model {
  _layers = [];

  constructor(p5, _) {
    Object.setPrototypeOf(P5Model.prototype, p5);
    this.id = genUniqId();
  }

  get layers() { return this._layers; }

  setup() {
    const layers = this.buildLayers();
    layers.forEach(layer => layer.setup());
    this._layers = layers;
  }

  draw() {
    this.push();
    this.drawBlock(this);
    this.pop();
  }

  drawBlock(g) {}

  includes(_x, _y) { return false; }

  buildLayers() { return []; }
}
