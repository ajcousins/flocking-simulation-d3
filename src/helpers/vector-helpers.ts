import { Vector } from "p5";

export const getDistance = (location1: Vector, location2: Vector): number => {
  const dx = location1.x - location2.x;
  const dy = location1.y - location2.y;
  return Math.sqrt(dx * dx + dy * dy);
}