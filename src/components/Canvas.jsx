'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CANVAS_DIMS = {
  WIDTH: 500,
  HEIGHT: 500,
};

const Canvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select('#canvas');

    svg
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'cyan')
      .attr('cx', 40)
      .attr('cy', 20);
  }, []);

  return (
    <svg
      width={CANVAS_DIMS.WIDTH}
      height={CANVAS_DIMS.HEIGHT}
      id='canvas'
      ref={ref}
    >
      <rect width='100%' height='100%' fill='#111111'></rect>
    </svg>
  );
};

export default Canvas;
