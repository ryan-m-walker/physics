import Item from './Item';

class Solid extends Item {
  constructor(
    private x: number,
    private y: number,
    private w: number,
    private h: number
  ) {
    super();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }

  // push() {

  // }
}

export default Solid;
