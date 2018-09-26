import Item from './Item';
import { TAU } from '../utils/geometry';

// import stage from '../index';

class Trail extends Item {
  private birth: number;

  constructor(
    private x: number,
    private y: number,
    private radius: number,
    private lifespan: number
  ) {
    super();
    console.log(this);
    this.birth = this.$stage.getTick();
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    console.log(this.$stage);
    if (!(this.$stage.getTick() - this.birth > this.lifespan)) {
      ctx.beginPath();
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'orange';
      ctx.arc(this.x, this.y, this.radius, 0, TAU, true);
      ctx.stroke();
    } else {
      this.$stage.destroy(this.$id);
    }
  };

  step() {
    if (this.radius > 0.2) {
      this.radius -= 0.2;
    }
  }
}

export default Trail;
