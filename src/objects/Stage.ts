import * as _ from 'lodash';
import { injectable } from 'inversify';

import Item from './Item';

function applyGravity(item: any): void {
  item.speedY += item.gravity;
}

@injectable()
export default class Stage {
  private _items: Item[] = [];
  private _startTime: Date;
  private _upTime = 0;
  private _ctx: CanvasRenderingContext2D;
  private _tick = 0;
  private _running = false;
  private _frameID: number;

  public width: number;
  public height: number;

  constructor(
    private _canvas: HTMLCanvasElement,
    width?: number,
    height?: number
  ) {
    this._ctx = this._canvas.getContext('2d');
    this._startTime = new Date();
    this.width = width ? width : this._ctx.canvas.width;
    this.height = height ? height : this._ctx.canvas.height;
    // window.addEventListener('keydown', (e: KeyboardEvent) => {});
  }

  add(item: Item): void {
    this._items.push(item);
    item.setStage(this);
  }

  getTick() {
    return this._tick;
  }

  getUpTime() {
    return this._upTime;
  }

  getWidth(): number {
    return this._ctx.canvas.width;
  }

  getHeight(): number {
    return this._ctx.canvas.height;
  }

  // draw() {
  //   this._items.forEach(item => item.draw(this._ctx));
  // }

  clear() {
    this._ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
  }

  everySecond() {
    this._items.forEach(item => item.everySecond());
  }

  destroy(itemId: string): void {
    this._items = this._items.filter(item => item.$id !== itemId);
  }

  step = () => {
    this.clear();
    this._items.forEach(item => {
      item.draw(this._ctx);
      item.step(this._ctx);
    });

    if (this._running) {
      this._tick++;
      window.requestAnimationFrame(this.step);
    }
  };

  start() {
    this._running = true;
    window.requestAnimationFrame(this.step);
  }

  pause() {
    this._running = false;
  }

  fullScreen(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    _;
    this._canvas.width = this.width;
    this._canvas.height = this.height;

    window.addEventListener(
      'resize',
      _.throttle((e: Event) => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this._canvas.width = this.width;
        this._canvas.height = this.height;
      }, 50)
    );
  }
}
