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

    const flock = [];

    for (let i = 0; i < 100; i++) {
      flock.push(
        new Boid({
          startPos: new Vector(CANVAS_DIMS.WIDTH / 2, CANVAS_DIMS.HEIGHT / 2),
          canvas: svg,
        })
      );
    }

    for (let boid of flock) {
      boid.show();
    }

    d3.interval(() => {
      update(flock);
    }, 30);
  }, []);

  function update(flock) {
    for (let boid of flock) {
      boid.updatePos();
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
