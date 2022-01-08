import * as CanvasCapture from 'canvas-capture';

const FORMAT_GIF = 'gif';
const FORMAT_MP4 = 'mp4';

const FILENAME = 'birthday20220116';

export class Recorder {
  _format = null;
  _recording = false;

  get recording() { return this._recording; }

  init(canvas) { CanvasCapture.init(canvas, { showRecDot: true }); }

  startGif() { this._start(FORMAT_GIF); }
  startMp4() { this._start(FORMAT_MP4); }

  record() {
    if (!this.recording) {
      return;
    }

    CanvasCapture.recordFrame();
  }
  stop() {
    this._format = null;
    this._recording = false;

    CanvasCapture.stopRecord();
  }

  takeSnapshot() {
    if (this.recording) {
      return;
    }

    CanvasCapture.takePNGSnapshot({ name: FILENAME });
  }

  _start(format) {
    this._format = format;
    this._recording = true;

    switch (format) {
      case FORMAT_GIF:
        CanvasCapture.beginGIFRecord({ name: FILENAME, fps: 30 });
        break;
      case FORMAT_MP4:
        CanvasCapture.beginVideoRecord({ name: FILENAME, format: FORMAT_MP4, fps: 30 });
        break;
      default:
        break;
    }
  }
}
