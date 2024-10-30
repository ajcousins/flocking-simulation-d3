// export class Vector {
//   x: number;
//   y: number;
//   // magnitude: number;
//   constructor(x?: number, y?: number, magnitude?: number) {
//     this.x = x ?? 0;
//     this.y = y ?? 0;
//     // this.magnitude = magnitude ?? 1;
//   }

//   add(vector: Vector): void {
//     this.x += vector.x;
//     this.y += vector.y;
//   }

//   sub(vector: Vector): void {
//     this.x -= vector.x;
//     this.y -= vector.y;
//   }

//   div(scalar: number): void {
//     // console.log('this.x (before):', this.x);
//     // console.log('scalar:', scalar);
//     this.x /= scalar;
//     this.y /= scalar;
//     // console.log('this.x (after):', this.x);
//   }

//   getDistanceFrom(vector: Vector): number {
//     const dx = this.x - vector.x;
//     const dy = this.y - vector.y;
//     return Math.sqrt(dx * dx + dy * dy);
//   }
// }
