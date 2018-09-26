import 'reflect-metadata';
import Stage from './objects/Stage';
import Hub from './objects/Hub';
import * as _ from 'lodash';
import { random, getDir } from './utils/geometry';
import Particle from './objects/Particle';
import Box from './objects/Box';
import Item from './objects/Item';
import Solid from './objects/Solid';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const stage = new Stage(canvas);

stage.fullScreen();

stage.add(new Solid(50, 50, 50, 50));

stage.start();

// export default stage;

// --------------------------------------------

stage.add(
  new Box(50, 50, 50, 50, {
    gravity: 0.8,
    accelerationX: 0.5,
    accelerationY: 1,
    friction: 0.125,
    maxSpeed: 15,
  })
);

stage.fullScreen();
stage.start();

// const ship = new Hub(stage.width / 2, stage.height / 2, 'teal');

for (let i = 0; i < 500; i++) {
  enum colors {
    'teal',
    'orange',
    'orangered',
    'yellow',
  }

  const x = random(0, stage.width);
  const y = random(0, stage.height);
  const radius = random(1, 4);
  const color = colors[random(0, 3)];
  const angle = random(1, 360);
  const speed = random(1, 2);

  stage.add(new Particle(x, y, radius, color, angle, speed));
}

console.log(Reflect.metadata);

// export default stage;

// ---------------------------------  */

// stage.add(ship);

// canvas.addEventListener('mousemove', (event: MouseEvent) => {
//   const adj = event.clientX - ship.x;
//   const opp = event.clientY - ship.y;
//   const theta = Math.asin(opp / adj);
//   console.log('------------');
//   console.log('adj', adj);
//   console.log('opp', opp);
//   console.log('theta', theta);

//   console.log(degrees(theta));
//   ship.setAngle(degrees(theta) * -1);
// });

// document.addEventListener('keydown', (e: KeyboardEvent) => {
//   // if (e.keyCode === )
//   console.log(e.key);
//   switch (e.keyCode) {
//     case 39:
//       ship.addAngle(1);
//       break;
//     case 37:
//       ship.addAngle(-1);
//       break;
//   }
// });
