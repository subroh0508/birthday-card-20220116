export class Circle {
  radius = 0;

  constructor(radius) {
    this.radius = radius;
  }

  diameter() { return this.radius * 2; }
}
