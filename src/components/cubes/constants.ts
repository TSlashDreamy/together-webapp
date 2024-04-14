import { ICubeGenerator } from "./types";

export const cubesGeneratorConfig: ICubeGenerator = {
  cubesLimits: { min: 2, max: 7 },
  sizeLimits: { min: 2, max: 30 },
  movementRange: { min: 10, max: 100 },
  rotationRange: { min: 0, max: 360 },
  roundnessLimits: { min: 5, max: 100 },
  screenLimitations: { min: 3, max: 100 },
  animationLimitations: {min: 2, max: 7 },
};
