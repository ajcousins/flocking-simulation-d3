import { Vector } from './vector';

interface BoidProps {
  startPos: Vector;
  startVelocity?: Vector;
  canvas: d3.Selection<d3.BaseType, any, HTMLElement, any>;
  canvasWidth: number;
  canvasHeight: number;
  id: number | string;
}

export class Boid {
  id: number | string;
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  canvas: d3.Selection<d3.BaseType, any, HTMLElement, any>;
  canvasWidth: number;
  canvasHeight: number;
  element: d3.Selection<any, any, HTMLElement, any>;
  maxForce: number;
  maxSpeed: number;

  constructor({
    startPos,
    startVelocity,
    canvas,
    canvasWidth,
    canvasHeight,
    id,
  }: BoidProps) {
    this.id = id;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.canvas = canvas ?? null;
    this.position = startPos;
    this.velocity = startVelocity ?? Vector.random2D();
    this.velocity.setMag(3);
    this.acceleration = new Vector();
    this.maxForce = 0.2;
    this.maxSpeed = 6;
  }

  edges() {
    if (this.id === 'mouse') return;
    if (this.position.x > this.canvasWidth) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.canvasWidth;
    }
    if (this.position.y > this.canvasHeight) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.canvasHeight;
    }
  }

  setPosition(position: Vector): void {
    this.position = position;
  }

  align(boids: Boid[]): Vector {
    let perceptionRadius = 25;
    let steering = new Vector();
    let total = 0;
    for (let other of boids) {
      if (other.id === 'mouse') continue;
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

  separation(boids: Boid[]) {
    let perceptionRadius = 25;
    let steering = new Vector();
    let total = 0;
    for (let other of boids) {
      if (other.id === 'mouse') continue;
      let d = Vector.getDistance(this.position, other.position);
      if (other != this && d < perceptionRadius) {
        let diff = new Vector(this.position.x, this.position.y).sub(
          other.position
        );
        diff.div(d * d);
        steering.add(diff);
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

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = new Vector();
    let total = 0;
    for (let other of boids) {
      if (other.id === 'mouse') continue;
      let d = Vector.getDistance(this.position, other.position);
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  repelMouse(boids: Boid[]) {
    let steering = new Vector();
    if (this.id === 'mouse') return steering;
    const mouse = boids.find((boid) => boid.id === 'mouse');
    if (!mouse) return steering;
    const positionDifferenceAngle = Vector.getAngleBetweenPoints(
      this.position,
      mouse.position
    );
    const velocityAngle = this.velocity.getAngle();
    const angleDifference = velocityAngle - positionDifferenceAngle;
    const perceptionRadius = 100;
    const maxDeflectionAngle = 60;

    const distanceFromMouse = Vector.getDistance(this.position, mouse.position);
    if (
      Math.abs(angleDifference) < 45 &&
      distanceFromMouse < perceptionRadius
    ) {
      const perpendicularVector = Vector.getResultantAngleTransform(
        this.velocity,
        maxDeflectionAngle
      );
      steering.add(perpendicularVector);
    }

    if (
      Math.abs(angleDifference) > 315 &&
      distanceFromMouse < perceptionRadius
    ) {
      const perpendicularVector = Vector.getResultantAngleTransform(
        this.velocity,
        -maxDeflectionAngle
      );
      steering.add(perpendicularVector);
    }
    steering.limit(this.maxForce);
    steering.setMag(this.maxSpeed);

    return steering;
  }

  flock(boids: Boid[]) {
    const alignment = this.align(boids);
    const separation = this.separation(boids);
    const cohesion = this.cohesion(boids);
    const mouseRepel = this.repelMouse(boids);

    // default slider values
    alignment.mult(1.5);
    separation.mult(2);
    cohesion.mult(1);
    mouseRepel.mult(10);

    this.acceleration.add(alignment);
    this.acceleration.add(separation);
    this.acceleration.add(cohesion);
    this.acceleration.add(mouseRepel);
  }

  updatePos() {
    if (this.id === 'mouse') return;
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    if (this.id === 'mouse') {
      // // HIGHLIGHT MOUSE POSITION
      // this.element = this.canvas
      //   .append('circle')
      //   .attr('r', 100)
      //   .attr('stroke', '#555555')
      //   .attr('fill', '#00000000')
      //   .attr('cx', this.position.x)
      //   .attr('cy', this.position.y);
      return;
    }
    this.element = this.canvas
      .append('path')
      .attr('d', 'M 14 0 L 0 -4 L 0 4 Z')
      .attr('stroke', '#999999')
      .attr(
        'transform',
        `translate(${this.position.x}, ${this.position.y})
          rotate(${this.velocity.getAngle()})`
      );
  }

  updateRender() {
    if (this.id === 'mouse') {
      // // HIGHLIGHT MOUSE POSITION
      // this.element.attr('cx', this.position.x).attr('cy', this.position.y);
      return;
    }
    this.element.attr(
      'transform',
      `translate(${this.position.x}, ${this.position.y})
        rotate(${this.velocity.getAngle()})`
    );
  }
}
