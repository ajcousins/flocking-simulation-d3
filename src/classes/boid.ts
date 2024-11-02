import { Vector } from './vector';

interface BoidProps {
  startPos: Vector;
  startVelocity?: Vector;
  canvas: d3.Selection<d3.BaseType, any, HTMLElement, any>;
  id: number;
}

export class Boid {
  id: number;
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  canvas: d3.Selection<d3.BaseType, any, HTMLElement, any>;
  element: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  maxForce: number;
  maxSpeed: number;

  constructor({ startPos, startVelocity, canvas, id }: BoidProps) {
    this.id = id;
    this.canvas = canvas;
    this.position = startPos;
    this.velocity = startVelocity ?? Vector.random2D();
    this.velocity.setMag(3);
    this.acceleration = new Vector();
    this.maxForce = 0.2;
    this.maxSpeed = 2;
  }

  edges() {
    if (this.position.x > 500) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = 500;
    }
    if (this.position.y > 500) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = 500;
    }
  }

  show() {
    this.element = this.canvas
      .append('path')
      .attr('d', 'M 14 0 L 0 -4 L 0 4 Z')
      .attr('stroke', 'white')
      .attr(
        'transform',
        `
        translate(${this.position.x}, ${this.position.y})
        rotate(${this.velocity.getAngle()})
      `
      );
  }

  align(boids: Boid[]): Vector {
    let perceptionRadius = 25;
    let steering = new Vector();
    let total = 0;
    for (let other of boids) {
      let d = Vector.getDistance(this.position, other.position);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  flock(boids: Boid[]) {
    let alignment = this.align(boids);
    alignment.mult(1.5); // default slider value
    this.acceleration.add(alignment);
  }

  updatePos() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  updateRender() {
    this.element.attr(
      'transform',
      `
        translate(${this.position.x}, ${this.position.y})
        rotate(${this.velocity.getAngle()})
      `
    );
  }
}
