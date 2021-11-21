import p5 from 'p5';
import { Gear } from './Gear';
import { UmbrellasController } from './UmbrellasController';

const drawGear = (p, n, r, color) => {
  const gear = new Gear(r, n, color);

  gear.arcs(({ start, end, radius }) => {
    p.fill(color);
    p.arc(0, 0, radius, radius, start, end, p.PIE);
  });
  p.fill(255);
  p.ellipse(0, 0, 10);
}

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
    p.push();
    p.stroke(p.color(200, 0, 0));
    p.translate(200, 200);
    p.rotate(p.frameCount / 10);
    drawGear(p, 20, 50, p.color(200, 0, 0));
    p.pop();

    p.push();
    p.stroke(p.color(0, 200, 0));
    p.translate(92, 200);
    p.rotate(-p.frameCount / 10 + 120);
    drawGear(p, 20, 50, p.color(0, 200, 0));
    p.pop();

    p.push();
    p.stroke(p.color(0, 0, 200));
    p.translate(200, 92);
    p.rotate(-p.frameCount / 10);
    drawGear(p, 20, 50, p.color(0, 0, 200));
    p.pop();

    p.push();
    p.stroke(p.color(0, 255, 255));
    p.translate(277, 277);
    p.rotate(-p.frameCount / 10 + 44);
    drawGear(p, 20, 50, p.color(0, 255, 255))
    p.pop();

    const controller = new UmbrellasController(
        p,
        [{ radius: 100, boneCount: 8 }],
    );

    p.push();
    p.translate(300, 300);
    controller.draw();
    p.pop();
  }
};

new p5(sketch, document.body);
