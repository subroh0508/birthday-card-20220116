import { genUniqId } from '../../utilities';

export class P5Model {
  constructor(p5, _) {
    Object.setPrototypeOf(P5Model.prototype, p5);
    this.id = genUniqId();
  }

  draw() {
    this.push();
    this.drawBlock(this);
    this.pop();
  }

  drawBlock(g) {}

  includes(_x, _y) { return false; }
}
