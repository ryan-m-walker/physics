import Stage from './Stage';
import * as uuid from 'uuid';

export default class Item {
  $stage: Stage;
  $id: string;

  public gravity = 0;
  public maxGravity = 25;

  constructor() {
    this.$id = uuid();
  }

  setStage = (stage: Stage): void => {
    this.$stage = stage;
  };

  move(dir: 'up' | 'right' | 'down' | 'left'): void {}

  draw(ctx?: CanvasRenderingContext2D): void {}

  step(ctx?: CanvasRenderingContext2D): void {}

  everySecond(): void {}
}
