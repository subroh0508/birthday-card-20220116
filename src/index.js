import p5 from 'p5';
import { Canvas } from './Canvas';

const sketch = (p) => {
  const canvas = new Canvas(
    p,
    [
      { radius: 50, teethCount: 20, color: '#FF0000', translate: { x: 200, y: 200 } },
      { radius: 50, teethCount: 20, color: '#00FF00', translate: { x: 92, y: 200 } },
      { radius: 50, teethCount: 20, color: '#0000FF', translate: { x: 200, y: 92 } },
      { radius: 50, teethCount: 20, color: '#00FFFF', translate: { x: 277, y: 277 } },
    ],
    [
      { radius: 100, boneCount: 8, translate: { x: 300, y: 300 } },
    ],
  );

  p.preload = () => {
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    p.background(100);
    p.frameRate(30);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(100);
    canvas.draw();
  }

  p.mousePressed = () => {

  }

  p.mouseDragged = () => {

  }

  p.mouseReleased = () => {

  }
};

new p5(sketch, document.body);
