import compose from 'lodash/fp/compose';
import { Translatable } from '../mixins/Translatable';
import { P5Model } from '../abstract/P5Model';
import { distance as calcDistance } from '../../utilities';
import { StarLayer } from './StarLayer';

const StarBehavior = compose(Translatable)(P5Model);

const STAR_RADIUS = 15;

export default class Star extends StarBehavior {
  static effects(p5, width, height) {
    return [...Array(100)].reduce((p) => {
      let candidate = '';
      while (p.includes(candidate)) {
        candidate = `${Math.random() * width},${Math.random() * height}`;
      }

      return [...p, candidate];
    }, []).map(p => {
      const [x, y] = p.split(',');

      return new Star(p5, { translate: { x, y }});
    });
  }

  get needPower() { return true; }
  get layer() { return this.layers[0]; }

  draw(hasPower) {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.layer.draw(hasPower);
    this.drawLayers();
    this.pop();
  }

  includes(mouseX, mouseY) { return this.distance(mouseX, mouseY) <= STAR_RADIUS; }
  distance(...args) { return calcDistance(this, ...args); }

  buildLayers() { return [new StarLayer(this)]; }
}