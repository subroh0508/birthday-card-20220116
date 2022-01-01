import { P5Model } from '../../abstract/P5Model';
import { ClockCoverFrameLayer, ClockCoverHingeLayer, ClockCoverSurfaceLayer } from './ClockCoverLayers';
import { YUIKA_RADIUS } from '../constants';

export class ClockCover extends P5Model {
  draw() {
    this.translate(0, YUIKA_RADIUS);
    this.layers.forEach(layer => {
      this.translate(0, -layer.translateY);
      this.image(layer, -layer.origin.x, -layer.origin.y);
      this.translate(0, layer.translateY);
    });
  }

  buildLayers() {
    return [
      new ClockCoverHingeLayer(this, 0),
      new ClockCoverSurfaceLayer(this, 1),
      new ClockCoverFrameLayer(this, 2),
    ];
  }
}
