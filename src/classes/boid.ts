import { Vector } from 'p5';
import { getDistance, getRandomVector } from '../helpers/vector-helpers';

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
  element: d3.Selection<SVGCircleElement, any, HTMLElement, any>;
  maxForce: number;
  maxSpeed: number;
  // history: any;
  // frameCount: number;

  constructor({ startPos, startVelocity, canvas, id }: BoidProps) {
    this.id = id;
    this.canvas = canvas;
    this.position = startPos;
    this.velocity = startVelocity ?? Vector.random2D();
    this.velocity.setMag(3);
    this.acceleration = new Vector();
    this.maxForce = 0.2;
    this.maxSpeed = 2;
    // this.history = [];
    // this.frameCount = 0;
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
      .append('circle')
      .attr('r', 2)
      .attr('fill', 'yellow')
      .attr('cx', this.position.x)
      .attr('cy', this.position.y);
  }

  align(boids: Boid[]): Vector {
    // console.log('--- frame ---');
    let perceptionRadius = 25;
    let steering = new Vector();
    // if (this.id === 0) {console.log('steering 1:', steering);}
    let total = 0;
    for (let other of boids) {
      let d = getDistance(this.position, other.position);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        // if (this.id === 0) {console.log('steering 2:', steering);}
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      // if (this.id === 0) {console.log('steering 3:', steering);}
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      // if (this.id === 0) {console.log('steering 4:', steering);}
      steering.limit(this.maxForce);
    }
    // if (steering.x !== 0 || steering.y !== 0) {
    //   this.history.push(`--- steering: (x: ${
    //     steering.x.toFixed(2)
    //   }, y: ${
    //     steering.y.toFixed(2)
    //   }}) ---`)
    // }

    return steering;
  }

  flock(boids: Boid[]) {
    // this.history.push("--- flock ---")
    let alignment = this.align(boids);
    alignment.mult(1.5); // default slider value
    this.acceleration.add(alignment);
  }
  
  updatePos() {
    // this.history.push("--- updatePos ---")
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0)
  }

  updateRender() {
    this.element.attr('cx', this.position.x).attr('cy', this.position.y);
    // this.history.push(
    //   `pos: (x: ${(this.position.x.toFixed(2))}, y: ${(
    //     this.position.y.toFixed(2)
    //   )}), vel: (x: ${(this.velocity.x.toFixed(2))}, y: ${(
    //     this.velocity.y.toFixed(2)
    //   )}), acc: (x: ${(
    //     this.acceleration.x.toFixed(2)
    //   )}, y: ${(this.acceleration.y.toFixed(2))})`
    // );
    // if (this.id === 0) {
      // this.canvas
      //   .append('circle')
      //   .attr('r', 2)
      //   .attr('fill', this.frameCount % 10 ? 'yellow' : 'magenta')
      //   .attr('cx', this.position.x)
      //   .attr('cy', this.position.y);
    // }
    // if (this.id === 0 && this.frameCount === 29) {
    //   console.table('this.history:', this.history);
    // }

    // this.frameCount++;
  }
}
