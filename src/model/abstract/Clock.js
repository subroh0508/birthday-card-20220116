import compose from 'lodash/fp/compose';
import { Translatable } from '../mixins/Translatable';
import { P5Model } from './P5Model';
import { distance as calcDistance, TWO_PI } from '../../utilities';

export const ROMAN_NUMBER_GRAPHIC_SIZE = 48;

const ClockBehavior = compose(Translatable)(P5Model);

export class Clock extends ClockBehavior {
  radius = 0;

  constructor(p5, args) {
    super(p5, args);

    const { radius } = args;
    this.radius = radius || 0;
  }

  draw() {
    this.push();
    this.drawBlock(this);
    this.pop();
  }

  includes(mouseX, mouseY) { return this.distance(mouseX, mouseY) <= this.radius; }
  distance(...args) { return calcDistance(this, ...args); }

  get clockHandAngles() {
    const [hours, minutes, seconds] = this._now;

    const secondAngle = TWO_PI * seconds / 60;
    const minuteAngle = TWO_PI * minutes / 60 + secondAngle / 60;
    const hourAngle = TWO_PI * hours / 12 + minuteAngle / 12;

    return [hourAngle, minuteAngle, secondAngle];
  }

  get _now() {
    const date = new Date(Date.now());

    return [
      date.getHours() % 12,
      date.getMinutes(),
      date.getSeconds(),
    ];
  }

  createNumber(n, color) {
    const numberGraphic = this.createGraphics(ROMAN_NUMBER_GRAPHIC_SIZE, ROMAN_NUMBER_GRAPHIC_SIZE);
    const offset = ROMAN_NUMBER_GRAPHIC_SIZE / 2;

    numberGraphic.strokeWeight(0);
    numberGraphic.fill(color);
    switch (n) {
      case 1:
        this._drawOne(offset, numberGraphic);
        break;
      case 2:
        this._drawTwo(offset, numberGraphic);
        break;
      case 3:
        this._drawThree(offset, numberGraphic);
        break;
      case 4:
        this._drawFour(offset, numberGraphic);
        break;
      case 5:
        this._drawFive(offset, numberGraphic);
        break;
      case 6:
        this._drawSix(offset, numberGraphic);
        break;
      case 7:
        this._drawSeven(offset, numberGraphic);
        break;
      case 8:
        this._drawEight(offset, numberGraphic);
        break;
      case 9:
        this._drawNine(offset, numberGraphic);
        break;
      case 10:
        this._drawTen(offset, numberGraphic);
        break;
      case 11:
        this._drawEleven(offset, numberGraphic);
        break;
      case 12:
        this._drawTwelve(offset, numberGraphic);
        break;
    }

    return numberGraphic;
  }

  _drawOne(offset, g) {
    g.translate(offset, 0);
    this._drawRomanOne(offset, g);
    g.translate(-offset, 0);
  }

  _drawTwo(offset, g) {
    this._drawOne(offset - 3.5, g);
    this._drawOne(offset + 3.5, g);
  }

  _drawThree(offset, g) {
    this._drawOne(offset - 7, g);
    this._drawOne(offset, g);
    this._drawOne(offset + 7, g);
  }

  _drawFour(offset, g) {
    this._drawOne(offset - 10.5, g);
    this._drawTwo(offset, g);
    this._drawOne(offset + 10.5, g);
  }

  _drawFive(offset, g) {
    g.translate(offset, 0);
    this._drawRomanFive(offset, g);
    g.translate(-offset, 0);
  }

  _drawSix(offset, g) {
    this._drawOne(offset - 13, g);
    this._drawFive(offset + 2.5, g);
  }

  _drawSeven(offset, g) {
    this._drawOne(offset - 16.5, g);
    this._drawSix(offset + 3.5, g);
  }

  _drawEight(offset, g) {
    this._drawOne(offset - 20, g);
    this._drawSeven(offset + 3.5, g);
  }

  _drawNine(offset, g) {
    this._drawTen(offset - 3.5, g);
    this._drawOne(offset + 13.5, g);
  }

  _drawTen(offset, g) {
    g.translate(offset, 0);
    this._drawRomanTen(offset, g);
    g.translate(-offset, 0);
  }

  _drawEleven(offset, g) {
    this._drawOne(offset - 13.5, g);
    this._drawTen(offset + 3.5, g);
  }

  _drawTwelve(offset, g) {
    this._drawOne(offset - 17, g);
    this._drawEleven(offset + 3.5, g);
  }

  _drawRomanOne(offset, g) {
    g.rect(-2.5, 0, 5, ROMAN_NUMBER_GRAPHIC_SIZE);
    g.rect(-3.5, 0, 7, 2);
    g.rect(-3.5, ROMAN_NUMBER_GRAPHIC_SIZE - 2, 7, 2);
  }

  _drawRomanFive(offset, g) {
    g.quad(-11, ROMAN_NUMBER_GRAPHIC_SIZE, -8, ROMAN_NUMBER_GRAPHIC_SIZE, 0.5, 0, -2.5, 0);
    g.quad(8, ROMAN_NUMBER_GRAPHIC_SIZE, 13, ROMAN_NUMBER_GRAPHIC_SIZE, 2.5, 0, -2.5, 0);
    g.rect(-12, ROMAN_NUMBER_GRAPHIC_SIZE - 2, 5, 2);
    g.rect(7, ROMAN_NUMBER_GRAPHIC_SIZE - 2, 7, 2);
  }

  _drawRomanTen(offset, g) {
    g.quad(-13, 0, -8, 0, 13, ROMAN_NUMBER_GRAPHIC_SIZE, 8, ROMAN_NUMBER_GRAPHIC_SIZE);
    g.quad(10, 0, 13, 0, -10, ROMAN_NUMBER_GRAPHIC_SIZE, -13, ROMAN_NUMBER_GRAPHIC_SIZE);
    g.rect(-14, 0, 7, 2);
    g.rect(7, ROMAN_NUMBER_GRAPHIC_SIZE - 2, 7, 2);
    g.rect(9, 0, 5, 2);
    g.rect(-14, ROMAN_NUMBER_GRAPHIC_SIZE - 2, 5, 2);
  }
}
