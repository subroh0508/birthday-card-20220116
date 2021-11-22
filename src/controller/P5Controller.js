export class P5Controller {
  constructor(args) {
    const { p5 } = args;

    Object.setPrototypeOf(P5Controller.prototype, p5);
  }
}
