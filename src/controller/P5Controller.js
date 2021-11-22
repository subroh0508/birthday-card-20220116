export class P5Controller {
  target = null;

  constructor(args) {
    const { p5, target } = args;

    Object.setPrototypeOf(P5Controller.prototype, p5);
    this.target = target;
  }
}
