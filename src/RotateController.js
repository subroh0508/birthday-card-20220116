const RELATED_DISTANCE_THRESHOLD = 1.0

export class RotateController {
  p5 = null;
  objects = [];

  constructor(p5, objects) {
    this.p5 = p5;
    this.objects = objects;
  }

  isRelated(a, b) {
    const dx = a.translateX - b.translateX;
    const dy = a.translateY - b.translateY;

    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) - (a.radius + b.radius);

    return 0 < distance && distance < RELATED_DISTANCE_THRESHOLD;
  }

  setDirection(a, b) {
    if (this.isStoppedBoth(a, b) || (this.isRotatedBoth(a, b) && a.direction !== b.direction)) {
      return;
    }

    if (this.isRotatedBoth(a, b) && a.direction === b.direction) {
      a.direction.stop();
      b.direction.stop();
      return;
    }

    if (a.isStopped()) {
      a.direction = -b.direction;
    }

    if (b.isStopped()) {
      b.direction = -a.direction;
    }
  }

  isStoppedBoth(a, b) { return a.isStopped() && b.isStopped(); }
  isRotatedBoth(a, b) { return !a.isStopped() && !b.isStopped(); }
}
