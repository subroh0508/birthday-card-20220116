import { Collidable } from './Collidable';

export const Chainable = (P5Controller) => class extends Collidable(P5Controller) {
  mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions) {
    const willCollideAtMultiplePoints = collisions.length < 2 && nextCollisions.length > 1;

    if (willCollideAtMultiplePoints) {
      this._moveToChainObjectsPoint(draggedObj, nextCollisions);
      return;
    }

    super.mouseDraggedWithCollisions(draggedObj, collisions, nextCollisions);
  }

  _moveToChainObjectsPoint(draggedObj, collisions) {
    const { x, y } = _calcTranslatePointFromTriangle(
      draggedObj,
      ..._sortCollisions(draggedObj, collisions),
    );

    draggedObj.pressed(this.mouseX, this.mouseY);
    draggedObj.move(x, y);
  }
}

const _sortCollisions = (draggedObj, collisions) => collisions.sort((a, b) => b.translateY - a.translateY || b.translateX - a.translateX);

const _calcTranslatePointFromTriangle = (a, b, c) => {
  const slope = (b.translateY - c.translateY) / (b.translateX - c.translateX);
  const intercept = b.translateY - slope * b.translateX;

  const sign = Math.sign(a.translateY - (slope * a.translateX + intercept)) * Math.sign(slope);

  const bc = b.distance(c);
  const ca = c.minDistance(a);
  const ab = a.minDistance(b);

  const angleB = Math.acos((ab * ab + bc * bc - ca * ca) / (2 * ab * bc));
  const theta = Math.acos((c.translateX - b.translateX) / bc) + sign * angleB

  return {
    x: b.translateX + ab * Math.cos(theta),
    y: b.translateY - ab * Math.sin(theta),
  };
}

