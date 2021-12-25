import { Layer } from '../abstract/Layer';

export class GearLayer extends Layer {
  constructor(p5, size, { radius, innerRadius, teethCount }) {
    super(p5, size, { x: radius, y: radius });

    this.draw(radius, innerRadius, teethCount);
  }

  draw(radius, innerRadius, teethCount) {
    this.stroke(0);
    this.fill(0);
    arcs(
      radius * 2,
      innerRadius * 2,
      teethCount,
      ({ start, end, radius }) => {
        this.arc(0, 0, radius, radius, start, end, this.PIE);
      },
    );

    this.fill(255);
    this.ellipse(0, 0, 10);
  }
}

export const arcs = (diameter, innerDiameter, teethCount, callback) => {
  const loopCount = teethCount * 2;
  const rad = Math.PI * 2 / loopCount;

  [...Array(loopCount)].reduce((start, _, i) => {
    const radius = i % 2 === 0 ? innerDiameter : diameter;

    callback({ start, end: start + rad, radius });

    return start + rad;
  }, 0);
};
