import Item from './Item';
import Controller from './Controller';
import { KEY_CODES } from '../utils/keyCodes';
import Trail from './Trail';
import { TAU } from '../utils/geometry';

interface Config {
  friction?: number;
  maxSpeed?: number;
  accelerationX?: number;
  accelerationY?: number;
  gravity?: number;
  maxGravity?: number;
}

const defaultConfig = {
  friction: 0.125,
  maxSpeed: 15,
  accelerationX: 0.5,
  accelerationY: 1,
  gravity: 0,
  maxGravity: 24,
};

class Box extends Item {
  public friction: number;
  public maxSpeed: number;
  public accelerationX: number;
  public accelerationY: number;
  // private gravity: number;
  // private maxGravity: number;

  private speedX = 0;
  private speedY = 0;
  private boundTop: number;
  private boundRight: number;
  private boundBottom: number;
  private boundLeft: number;

  constructor(
    private x: number,
    private y: number,
    private w: number,
    private h: number,
    config: Config = {}
  ) {
    super();
    this.friction = config.friction || defaultConfig.friction;
    this.maxSpeed = config.maxSpeed || defaultConfig.maxSpeed;
    this.accelerationX = config.accelerationX || defaultConfig.accelerationX;
    this.accelerationY = config.accelerationY || defaultConfig.accelerationY;
    this.gravity = config.gravity || defaultConfig.gravity;
    this.maxGravity = config.gravity || defaultConfig.maxGravity;
    this.calcBound();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.strokeStyle = 'orangered';
    ctx.lineWidth = 4;
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }

  calcBound() {
    this.boundTop = this.y;
    this.boundRight = this.x + this.w;
    this.boundBottom = this.y + this.h;
    this.boundLeft = this.x;
  }

  step = () => {
    // apply friction to each direction
    if (this.speedX > 0) {
      this.speedX -= this.friction;
    }

    if (this.speedX < 0) {
      this.speedX += this.friction;
    }

    if (this.speedY > 0) {
      this.speedY -= this.friction;
    }

    if (this.speedY < 0) {
      this.speedY += this.friction;
    }

    // apply gravity
    if (this.speedY < this.maxSpeed + this.maxGravity) {
      this.speedY += this.gravity;
    }

    // Check for arrow key events
    if (Controller.keyDown(KEY_CODES.rightArrow)) {
      // cap acceleration at max speed
      if (this.speedX > this.maxSpeed) {
        this.speedX = this.maxSpeed;
      } else {
        this.speedX += this.accelerationX;
      }
    }

    if (Controller.keyDown(KEY_CODES.leftArrow)) {
      if (this.speedX < this.maxSpeed * -1) {
        this.speedX = this.maxSpeed * -1;
      } else {
        this.speedX -= this.accelerationX;
      }
    }

    if (Controller.keyDown(KEY_CODES.downArrow)) {
      if (this.speedY > this.maxSpeed) {
        this.speedY = this.maxSpeed;
      } else {
        this.speedY += this.accelerationY;
      }
    }

    if (Controller.keyDown(KEY_CODES.upArrow)) {
      if (this.speedY < this.maxSpeed * -1) {
        this.speedY = this.maxSpeed * -1;
      } else {
        this.speedY -= this.accelerationY;
      }
    }

    // add bounce to hitting edge of canvas
    if (this.boundRight > this.$stage.width) {
      this.speedX = (this.speedX / 2) * -1;
      this.x = this.$stage.width - this.w;
    }

    if (this.boundLeft < 0) {
      this.speedX = (this.speedX / 2) * -1;
      this.x = 0;
    }

    if (this.boundTop < 0) {
      this.speedY = (this.speedY / 2) * -1;
      this.y = 1;
    }

    if (this.boundBottom > this.$stage.height) {
      this.y = this.$stage.height - this.h - 1;
      this.speedY = this.speedY * 0.35 * -1;
    }

    // move the box according to the x & y speeds
    this.x += this.speedX;
    this.y += this.speedY;

    // Add the trail
    // if (
    //   Controller.keyDown(KEY_CODES.upArrow) ||
    //   Controller.keyDown(KEY_CODES.rightArrow) ||
    //   Controller.keyDown(KEY_CODES.downArrow) ||
    //   Controller.keyDown(KEY_CODES.leftArrow)
    // ) {
    //   this.$stage.add(
    //     new Trail(this.x + this.w / 2, this.y + this.h / 2, 8, 65)
    //   );
    // }

    // recalculate the bounding box with new x y position
    this.calcBound();
  };
}

export default Box;
