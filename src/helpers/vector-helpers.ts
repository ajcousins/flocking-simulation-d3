// import { Vector } from '../classes/vector';

import { Vector } from "p5";

export const getRandomVector = (): Vector => {
  const degrees = Math.random() * 360;
  const magnitude = Math.random() + 0.5;
  const angleRadians = (degrees * Math.PI) / 180;
  const x = Math.cos(angleRadians) * magnitude;
  const y = Math.sin(angleRadians) * magnitude;
  // console.log('--- random vector ---');
  // console.log('new Vector(x, y):', new Vector(x, y));
  return new Vector(x, y);
};

export const getDistance = (location1: Vector, location2: Vector): number => {
  const dx = location1.x - location2.x;
  const dy = location1.y - location2.y;
  return Math.sqrt(dx * dx + dy * dy);
}