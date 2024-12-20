'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Boid } from '../classes/boid';
import { Vector } from '../classes/vector';

const NUMBER_OF_BOIDS = 20;
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

    for (let i = 0; i < NUMBER_OF_BOIDS; i++) {
      boids.push(
        new Boid({
          startPos: new Vector(
            Math.random() * CANVAS_DIMS.WIDTH,
            Math.random() * CANVAS_DIMS.HEIGHT
          ),
          canvas: svg,
          canvasWidth: CANVAS_DIMS.WIDTH,
          canvasHeight: CANVAS_DIMS.HEIGHT,
          id: i,
        })
      );
    }

    const mouseBoid = new Boid({
      startPos: new Vector(-100, -100), // off screen
      canvas: svg,
      canvasWidth: CANVAS_DIMS.WIDTH,
      canvasHeight: CANVAS_DIMS.HEIGHT,
      id: 'mouse',
    });

    boids.push(mouseBoid);

    for (let boid of boids) {
      boid.show();
    }

    svg.on('mousemove', (event) => {
      const { offsetX, offsetY } = event;
      mouseBoid.setPosition(new Vector(offsetX, offsetY));
    });

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
