import p5 from 'p5';
import { Canvas } from './Canvas';
import { RotateDirection } from './model/mixins/Rotatable';

const sketch = (p) => {
  const canvas = new Canvas(
    p,
    [
      { radius: 70, teethCount: 20, color: '#FF0000', translate: { x: 200, y: 92 }, direction: RotateDirection.LEFT },
      { radius: 40, teethCount: 20, color: '#00FF00', translate: { x: 92, y: 200 } },
      { radius: 60, teethCount: 20, color: '#0000FF', translate: { x: 300, y: 250 } },
      { radius: 50, teethCount: 20, color: '#AA0000', translate: { x: 500, y: 500 } },
      { radius: 50, teethCount: 20, color: '#00BB00', translate: { x: 600, y: 500 } },
      { radius: 50, teethCount: 20, color: '#0000CC', translate: { x: 700, y: 500 } },
      { radius: 50, teethCount: 20, color: '#001100', translate: { x: 500, y: 600 } },
      { radius: 50, teethCount: 20, color: '#110000', translate: { x: 500, y: 700 } },
      { radius: 50, teethCount: 20, color: '#000011', translate: { x: 600, y: 600 } },
    ],
    [
      { radius: 100, boneCount: 8, color: '#FFFFFF', translate: { x: 100, y: 400 }, direction: RotateDirection.LEFT },
    ],
  );

  p.preload = () => {
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
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
