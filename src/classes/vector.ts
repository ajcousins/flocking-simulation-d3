export class Vector {
  x: number;
  y: number;
  // magnitude: number;
  constructor(x?: number, y?: number, magnitude?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    // this.magnitude = magnitude ?? 1;
  }

  add(vector: Vector): void {
    this.x += vector.x;
    this.y += vector.y;
  }

  sub(vector: Vector): void {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  div(scalar: number): void {
    this.x /= scalar;
    this.y /= scalar;
  }

  random2d(): Vector {
    const degrees = Math.random() * 360;
    const magnitude = Math.random() + 0.5;
    const angleRadians = (degrees * Math.PI) / 180;
    const x = Math.cos(angleRadians) * magnitude;
    const y = Math.sin(angleRadians) * magnitude;

    return new Vector(x, y);
  }
}
