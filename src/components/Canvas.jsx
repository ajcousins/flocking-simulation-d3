'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Boid } from '../classes/boid';
// import { Vector } from '../classes/vector';
import { Vector } from 'p5';

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
    // boids.push(new Boid({
    //   startPos: new Vector(200, 350),
    //   startVelocity: new Vector(4, -3),
    //   canvas: svg,
    //   id: 0
    // }))
    // boids.push(new Boid({
    //   startPos: new Vector(180, 350),
    //   startVelocity: new Vector(4, -3),
    //   canvas: svg,
    //   id: 0
    // }))
    // boids.push(new Boid({
    //   startPos: new Vector(300, 350),
    //   startVelocity: new Vector(-4, -3),
    //   canvas: svg,
    //   id: 1
    // }))

    for (let boid of boids) {
      boid.show();
    }

    d3.interval(() => {
      // console.log('------------- frame -------------');
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
