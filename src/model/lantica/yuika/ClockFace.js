import { ClockDialLayer, ClockFaceLayer } from './ClockFaceLayers';
import { YUIKA_RADIUS } from '../constants';
import { P5Model } from '../../abstract/P5Model';
import { distance as calcDistance } from '../../../utilities';

export class ClockFace extends P5Model {
  get radius() { return YUIKA_RADIUS; }

  draw() {
    this.layers.forEach(layer => {
      this.image(layer, -layer.origin.x, -layer.origin.y);
    });
  }

  includes(obj, mouseX, mouseY) { return calcDistance(obj, mouseX, mouseY) <= this.radius; }

  buildLayers() {
    return [
      new ClockFaceLayer(this, 0),
      new ClockDialLayer(this, 1),
    ];
  }
}
