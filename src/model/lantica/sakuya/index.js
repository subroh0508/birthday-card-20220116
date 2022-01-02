import { LanticaGear } from '../LanticaGear';
import { SAKUYA_RADIUS } from '../constants';
import { GearOuterLayer, GearInnerLayer } from './GearFrameLayers';

const SAKUYA_GEAR_TEETH_HEIGHT = 16;

export default class Sakuya extends LanticaGear {
  constructor(p5, args) {
    super(
      p5,
      {
        ...args,
        radius: SAKUYA_RADIUS,
        teethHeight: SAKUYA_GEAR_TEETH_HEIGHT,
        teethWidthRatio: 0.5,
      },
    );
  }

  get gears() { return this.layers; }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.rotate(this.rotationAngle);
    this.gears.forEach(gear => {
      this.image(gear, -gear.origin.x, -gear.origin.y);
    })
    this.pop();
  }

  buildLayers() {
    return [
      new GearInnerLayer(
        this,
        this.radius,
        this.teethHeight,
        this.teethCount,
        0,
      ),
      new GearOuterLayer(
        this,
        this.radius,
        this.teethHeight,
        this.teethCount,
        1,
      ),
    ];
  }
}