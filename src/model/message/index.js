import compose from 'lodash/fp/compose';
import { P5Model } from '../abstract/P5Model';
import { Translatable } from '../mixins/Translatable';
import { YUIKA_COLOR } from '../lantica/constants';

const MessageBehavior = compose(Translatable)(P5Model);

const FONT_NAME = 'Pinyon Script';
const FONT_SIZE = 52;
const LINE_SPACING = 1.4;
const MESSAGES = [
  [
    'Happy Birthday, My Dearest!',
    'I will always continue to be your producer!',
  ],
  [
    'Thank you for always, My Dearest!',
    'May you have a lot of happiness!',
  ],
  [
    "Let's ignite our song!",
    "And I believe our song and L'Antica forever!",
  ],
];

const BIRTHDAY = '2022.01.16'

export default class Message extends MessageBehavior {
  get Width() { return 900; }

  draw() {
    this.push();
    this.translate(this.translateX, this.translateY);
    this.fill(YUIKA_COLOR);
    this.stroke(255);
    this.strokeWeight(2);
    this.textFont(FONT_NAME);
    this.textSize(FONT_SIZE);
    MESSAGES[2].forEach((sentence, i) => this.text(sentence, -this.Width / 2, i * FONT_SIZE * LINE_SPACING));
    this.text(BIRTHDAY, -this.Width / 2, MESSAGES[2].length * FONT_SIZE * LINE_SPACING);

    this.pop();
  }
}
