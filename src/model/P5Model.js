export class P5Model {
  constructor(p5, args) {
    Object.setPrototypeOf(P5Model.prototype, p5);
  }

  draw() {
    this.push();
    this.drawBlock();
    this.pop();
  }

  drawBlock() {}
}
