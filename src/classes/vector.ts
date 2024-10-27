export class Vector {
  x: number;
  y: number;
  magnitude: number;
  constructor(x?: number, y?: number, magnitude?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.magnitude = magnitude ?? 1;
  }

  add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
}
