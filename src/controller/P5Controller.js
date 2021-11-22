export class P5Controller {
  constructor(args) {
    const { p5 } = args;

    Object.setPrototypeOf(P5Controller.prototype, p5);
  }

  get target() { return null; }

  draw() {
    if (Array.isArray(this.target)) {
      this.target.forEach((t) => t.draw());
      return;
    }

    this.target && this.target.draw();
  }
}
