import { P5Model } from '../../abstract/P5Model';
import { ClockHandleLayer } from './ClockHandleLayer';

export class ClockHandle extends P5Model {
  draw() {
    this.translate(0, -this.layers[0].translateY);
    this.image(this.layers[0], -this.layers[0].origin.x, -this.layers[0].origin.y);
    this.translate(0, this.layers[0].translateY);
  }

  buildLayers() {
    return [new ClockHandleLayer(this, 0)];
  }
}