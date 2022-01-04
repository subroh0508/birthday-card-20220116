import compose from 'lodash/fp/compose';
import { P5Model } from '../abstract/P5Model';
import { P5Layer } from '../abstract/P5Layer';
import { Translatable } from '../mixins/Translatable';
import { YUIKA_COLOR } from '../lantica/constants';

const MessageBehavior = compose(Translatable)(P5Model);

const FONT_NAME = 'Pinyon Script';
const FONT_SIZE = 52;
const LINE_SPACING = 1.4;
const BIRTHDAY = '2022.01.16';
const MESSAGES = [
  [
    'Happy Birthday, My Dearest!',
    'I will always continue to be your producer!',
    BIRTHDAY,
  ],
  [
    'Thank you for always, My Dearest!',
    'May you have a lot of happiness!',
    BIRTHDAY,
  ],
  [
    "Let's ignite our song!",
    "And I believe our song and L'Antica forever!",
    BIRTHDAY,
  ],
];

const MESSAGE_WIDTH = 1000;
const MESSAGE_HEIGHT = 250;

export default class Message extends MessageBehavior {
  _messageType = 0;
  _row = 0;
  _column = 0;

  get needPower() { return true; }
  get layer() { return this.layers[0]; }

  draw(hasPower) {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.layer.next(hasPower);
    this.drawLayers();
    this.pop();
  }

  buildLayers() { return [new MessageLayer(this, MESSAGES[2])]; }
}

class MessageLayer extends P5Layer {
  _message = [];
  _row = 0;
  _column = 0;

  constructor(p5, message, order) {
    super(
      p5,
      { width: MESSAGE_WIDTH, height: MESSAGE_HEIGHT },
      { x: 10, y: 50 },
      order,
    );

    this._message = message;
  }

  get row() { return this._row; }
  get column() { return this._column; }
  get message() { return this._message; }
  get nowSentence() { return this.message[this.row]; }
  get displayMessage() { return _sliceMessage(this.message, this.row, this.column); }

  next(hasPower) {
    this.clear();
    hasPower ? this._increase() : this._decrease();

    this.draw();
  }

  draw() {
    this.fill(YUIKA_COLOR);
    this.stroke(255);
    this.strokeWeight(2);
    this.textFont(FONT_NAME);
    this.textSize(FONT_SIZE);

    this.displayMessage.forEach((sentence, i) => this.text(sentence, 0, i * FONT_SIZE * LINE_SPACING));
  }

  _increase() {
    if (this.nowSentence.length === this.column) {
      if (this.message.length === this.row + 1) {
        return;
      }

      this._row += 1;
      this._column = 0;
      return;
    }

    this._column += 1;
  }

  _decrease() {
    console.log(this.column, this.row);
    if (this.column === 0) {
      if (this.row === 0) {
        return;
      }

      this._row -= 1;
      this._column = this.nowSentence.length;
      return;
    }

    this._column -= 1;
  }
}

const _sliceMessage = (message, row, column) => message.reduce((acc, sentence, i) => {
  if (i > row) {
    return acc;
  }

  if (i < row) {
    return [...acc, sentence];
  }

  return [...acc, sentence.slice(0, column)]
}, []);
