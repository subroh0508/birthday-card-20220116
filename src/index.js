import p5 from 'p5';
import { Canvas } from './Canvas';

const background = '#853998';

let messageType = 0;

const sketch = (p) => {
  const canvas = new Canvas(p, () => messageType);

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

window.onChangeMessageType = (type) => {
  messageType = type;
  document.getElementById('select-message-button').innerText = `選択中: メッセージ${type + 1}`;
};
window.onload = () => {
  new p5(sketch, document.getElementById('canvas'));
  window.onChangeMessageType(0);
};
