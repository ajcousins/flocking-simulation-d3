'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Boid } from '../classes/boid';
import { Vector } from '../classes/vector';

const CANVAS_DIMS = {
  WIDTH: 500,
  HEIGHT: 500,
};

/**
 * Coding Challenge 124: Flocking Simulation
 * https://youtu.be/mhjuuHl6qHM?si=eF90wuZtDIeTStKo
 */

const Canvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select('#canvas');

    const boids = [];

    for (let i = 0; i < 50; i++) {
      boids.push(
        new Boid({
          startPos: new Vector(
            Math.random() * CANVAS_DIMS.WIDTH,
            Math.random() * CANVAS_DIMS.HEIGHT
          ),
          canvas: svg,
          id: i,
        })
      );
    }

    for (let boid of boids) {
      boid.show();
    }

    d3.interval(() => {
      update(boids);
    }, 15);
  }, []);

  function update(boids) {
    for (let boid of boids) {
      boid.edges();
      boid.flock(boids);
      boid.updatePos();
    }
    for (let boid of boids) {
      boid.updateRender();
    }
  }

  return (
    <svg
      width={CANVAS_DIMS.WIDTH}
      height={CANVAS_DIMS.HEIGHT}
      id="canvas"
      ref={ref}
    >
      <rect width="100%" height="100%" fill="#111111"></rect>
    </svg>
  );
};

export default Canvas;
