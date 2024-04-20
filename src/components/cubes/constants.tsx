import { ICubeGenerator } from "./types";

export const cubesGeneratorConfig: ICubeGenerator = {
  cubesLimits: { min: 2, max: 7 },
  sizeLimits: { min: 2, max: 30 },
  movementRange: { min: 10, max: 100 },
  rotationRange: { min: 0, max: 360 },
  roundnessLimits: { min: 5, max: 100 },
  screenLimitations: { min: 3, max: 100 },
  animationLimitations: { min: 2, max: 7 },
};

export const defaultCubesPreset = [
  "size-[13vw] right-[29vw] bottom-[34vw] rotate-[130deg] rounded-[32px] animate-floating130",
  "size-[16vw] right-[6vw] bottom-[23vw] rotate-[-115deg] rounded-[50px] animate-floating115",
  "size-[20vw] right-[22vw] bottom-[4vw] rotate-[65deg] rounded-[50px] animate-floating65"
]
