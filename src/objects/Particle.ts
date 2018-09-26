import Item from './Item';
import { Vector2D, getDir, TAU, random } from '../utils/geometry';

const POS_OR_NEG = [1, -1];

export default class Particle extends Item {
  dirs: Vector2D;
  // dirX: number;
  // dirY: number;

  boundTop: number;
  boundRight: number;
  boundBottom: number;
  boundLeft: number;

  constructor(
    private x: number,
    private y: number,
    private radius: number,
    private color: string,
    private dirAngle: number,
    private speed: number
  ) {
    super();
    // this.dirs = getDir(dirAngle);
    // this.dirX = POS_OR_NEG[random(0, 1)];
    // this.dirY = POS_OR_NEG[random(0, 1)];
    this.setBoundingBox();
    this.dirs = getDir(this.dirAngle);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, TAU, true);
    ctx.stroke();
  }

  setBoundingBox(): void {
    this.boundTop = this.y - this.radius / 2;
    this.boundRight = this.x + this.radius / 2;
    this.boundBottom = this.y + this.radius / 2;
    this.boundLeft = this.x - this.radius / 2;
  }

  step(ctx: CanvasRenderingContext2D): void {
    if (this.x >= ctx.canvas.width || this.x <= 0) {
      this.dirs.x *= -1;
    }

    if (this.y >= ctx.canvas.height || this.y <= 0) {
      this.dirs.y *= -1;
    }

    this.x += this.dirs.x * this.speed;
    this.y += this.dirs.y * this.speed;
    this.setBoundingBox();
  }

  everySecond() {
    console.log(this.x);
  }
}
