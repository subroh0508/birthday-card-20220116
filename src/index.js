import p5 from 'p5';
import { Canvas } from './Canvas';
import { RotateDirection } from './model/mixins/Rotatable';

const background = '#853998';

const sketch = (p) => {
  const canvas = new Canvas(
    p,
    [
      { radius: 50, teethCount: 20, translate: { x: 600, y: 500 }, frameType: 1 },
      { radius: 50, teethCount: 20, translate: { x: 700, y: 500 }, frameType: 2 },
      { radius: 50, teethCount: 20, translate: { x: 500, y: 600 }, frameType: 3 },
      { radius: 50, teethCount: 20, translate: { x: 500, y: 700 }, frameType: 4 },
      { radius: 50, teethCount: 20, translate: { x: 600, y: 600 }, frameType: 5 },
      { radius: 50, teethCount: 20, translate: { x: 600, y: 700 }, frameType: 6 },
    ],
    [
      { radius: 100, boneCount: 8, color: '#FFFFFF', translate: { x: 100, y: 400 }, direction: RotateDirection.LEFT },
    ],
  );

  p.preload = () => {
  };

  p.setup = () => {
    p.createCanvas(Canvas.Width, Canvas.Height);
    p.background(0);
    p.frameRate(30);
    canvas.setup();
  };

  p.windowResized = () => {
    //p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);
    canvas.draw();
  }

  p.mousePressed = () => {
    canvas.mousePressed();
  }

  p.mouseDragged = () => {
    canvas.mouseDragged();
  }

  p.mouseReleased = () => {
    canvas.mouseReleased();
  }
};

new p5(sketch, document.body);
