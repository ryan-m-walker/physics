export class Vector2D {
  constructor(public x: number, public y: number) {}
}

export function radians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function degrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// export function getDir(angle: number): Vector2D {
//   const x = Math.sin(radians(angle));
//   const y = Math.sin(radians(angle));

//   return new Vector2D(x, y);
// }

export const TAU = Math.PI * 2;

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getDir(angle: number): Vector2D {
  if ((angle > 0 && angle <= 45) || (angle > 315 && angle <= 360)) {
    const x = 1;
    const y = Math.tan(radians(angle));
    return new Vector2D(x, y);
  } else if (angle > 45 && angle <= 135) {
    const x = 1 / Math.tan(radians(angle));
    const y = 1;
    return new Vector2D(x, y);
  } else if (angle > 135 && angle <= 225) {
    const x = -1;
    const y = -1 * Math.tan(radians(angle));
    return new Vector2D(x, y);
  } else if (angle > 225 && angle <= 315) {
    const x = -1 / Math.tan(radians(angle));
    const y = -1;
    return new Vector2D(x, y);
  }
}

console.log(getDir(250));
