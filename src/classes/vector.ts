/**
 * Reference: https://github.com/processing/p5.js/blob/main/src/math/p5.Vector.js
 */

export class Vector {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  add(vector: Vector): this {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector: Vector): this {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  mult(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  div(scalar: number): this {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  magSq() {
    const x = this.x;
    const y = this.y;
    return x * x + y * y;
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  normalize() {
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  setMag(n: number) {
    return this.normalize().mult(n);
  }

  limit(max: number) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
    }
    return this;
  }

  getAngle() {
    const angleRadians = Math.atan2(this.y, this.x);
    let angleDegrees = angleRadians * (180 / Math.PI);
    if (angleDegrees < 0) angleDegrees += 360;
    return angleDegrees;
  }

  static random2D(): Vector {
    const degrees = Math.random() * 360;
    const magnitude = Math.random() + 0.5;
    const angleRadians = (degrees * Math.PI) / 180;
    const x = Math.cos(angleRadians) * magnitude;
    const y = Math.sin(angleRadians) * magnitude;

    return new Vector(x, y);
  }

  static getDistance(location1: Vector, location2: Vector): number {
    const dx = location1.x - location2.x;
    const dy = location1.y - location2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
