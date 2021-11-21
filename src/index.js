import p5 from 'p5';
import { UmbrellasController } from './UmbrellasController';
import { GearsController } from './GearsController';

const sketch = (p) => {
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

    new GearsController(
      p,
      [
        { radius: 50, teethCount: 20, color: '#FF0000', translate: { x: 200, y: 200 } },
        { radius: 50, teethCount: 20, color: '#00FF00', translate: { x: 92, y: 200 } },
        { radius: 50, teethCount: 20, color: '#0000FF', translate: { x: 200, y: 92 } },
        { radius: 50, teethCount: 20, color: '#00FFFF', translate: { x: 277, y: 277 } },
      ],
    ).draw();

    new UmbrellasController(
      p,
      [
        { radius: 100, boneCount: 8, translate: { x: 300, y: 300 } },
      ],
    ).draw();
  }
};

new p5(sketch, document.body);
