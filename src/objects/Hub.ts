import Item from './Item';
import { TAU, radians } from '../utils/geometry';
import Controller from './Controller';
import { KEY_CODES } from '../utils/keyCodes';

class Hub extends Item {
  ROTATION_SPEED = 5;
  MOVEMENT_SPEED = 4;

  angle: number = 90;

  constructor(public x: number, public y: number, private color: string) {
    super();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(radians((this.angle * -1) % 360));
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.moveTo(25, 0);
    ctx.lineTo(-25, 25);
    ctx.lineTo(-25, -25);
    ctx.fill();
    ctx.restore();
  }

  addAngle(angle: number): void {
    this.angle += angle;
  }

  step() {
    if (Controller.keyDown(KEY_CODES.rightArrow)) {
      this.angle -= 1 * this.ROTATION_SPEED;
    }

    if (Controller.keyDown(KEY_CODES.leftArrow)) {
      this.angle += 1 * this.ROTATION_SPEED;
    }

    if (Controller.keyDown(KEY_CODES.upArrow)) {
      this.y -= 3;
    }

    if (Controller.keyDown(KEY_CODES.downArrow)) {
      this.y += 3;
    }
  }
}

export default Hub;
