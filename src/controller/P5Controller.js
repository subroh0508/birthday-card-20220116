export class P5Controller {
  constructor(p5) {
    Object.setPrototypeOf(P5Controller.prototype, p5);
  }

  get target() { return []; }

  draw() { this.target.forEach((t) => t.draw()); }

  mousePressed() {}
  mouseDragged() {}
  mouseReleased() {}
}
