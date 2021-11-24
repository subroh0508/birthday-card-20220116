let id = 0;

export function genUniqId() { return id++; }

export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}
