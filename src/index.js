import p5 from 'p5';

const drawGear = (p, n, r) => {
  let i = 0;
  for(i = 0; i < p.TWO_PI; i += 0.01){
    let y1 = 0;
    let y2 = 0;
    if(p.sin(i * n) >= 0){
      y1 = r;
    }else{
      y1 = r * 1.1;
    }
    p.line(y1 * p.cos(i), y1 * p.sin(i), 0, 0);
  }
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
    drawGear(p, 20, 50);
    p.pop();

    p.push();
    p.stroke(p.color(0, 200, 0));
    p.translate(92, 200);
    p.rotate(-p.frameCount / 10 + 120);
    drawGear(p, 20, 50);
    p.pop();

    p.push();
    p.stroke(p.color(0, 0, 200));
    p.translate(200, 92);
    p.rotate(-p.frameCount / 10);
    drawGear(p, 20, 50);
    p.pop();

    p.push();
    p.stroke(p.color(0, 255, 255));
    p.translate(277, 277);
    p.rotate(-p.frameCount / 10 + 44);
    drawGear(p, 20, 50);
    p.pop();
  }
};

new p5(sketch, document.body);
