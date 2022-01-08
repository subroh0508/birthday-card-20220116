import p5 from 'p5';
import * as CanvasCapture from 'canvas-capture';
import { Canvas } from './Canvas';
import { Recorder } from "./Recorder";

let messageType = 0;
const recorder = new Recorder();

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

    recorder.record();
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
window.takeSnapshot = () => recorder.takeSnapshot();
window.recordMp4 = () => {
  if (recorder.recording) {
    recorder.stop();
    document.getElementById('record-mp4').innerText = 'MP4出力';
    return;
  }

  recorder.startMp4();
  document.getElementById('record-mp4').innerText = 'MP4記録中';
}

window.onload = () => {
  const p5Instance = new p5(sketch, document.getElementById('canvas'));
  recorder.init(p5Instance.canvas);
  window.onChangeMessageType(0);
};
