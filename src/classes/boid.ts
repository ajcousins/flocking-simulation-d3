import { getRandomVector } from '../helpers/vector-helpers';
import { Vector } from './vector';

interface BoidProps {
  startPos: Vector;
  canvas: d3.Selection<d3.BaseType, any, HTMLElement, any>;
}

export class Boid {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  canvas: d3.Selection<d3.BaseType, any, HTMLElement, any>;
  element: d3.Selection<SVGCircleElement, any, HTMLElement, any>;
  constructor({ startPos, canvas }: BoidProps) {
    this.position = startPos;
    this.velocity = getRandomVector();
    this.acceleration = new Vector();
    this.canvas = canvas;
  }

  show() {
    this.element = this.canvas
      .append('circle')
      .attr('r', 4)
      .attr('fill', 'cyan')
      .attr('cx', this.position.x)
      .attr('cy', this.position.y);
  }

  updatePos() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.element.attr('cx', this.position.x).attr('cy', this.position.y);
  }
}
