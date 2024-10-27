import { Vector } from '../classes/vector';

export const getRandomVector = (): Vector => {
  const degrees = Math.random() * 360;
  const magnitude = Math.random() + 0.5;
  const angleRadians = (degrees * Math.PI) / 180;
  const x = Math.cos(angleRadians) * magnitude;
  const y = Math.sin(angleRadians) * magnitude;
  return new Vector(x, y);
};
