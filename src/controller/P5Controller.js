export class P5Controller {
  constructor(p5) {
    Object.setPrototypeOf(P5Controller.prototype, p5);
  }

  get target() { return []; }

  setup() { this.target.forEach(t => t.setup()); }
  draw() { this.target.forEach(t => t.draw()); }

  mousePressed() {}
  mouseDragged() {}
  mouseReleased() {}
}
