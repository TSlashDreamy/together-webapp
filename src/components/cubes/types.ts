import { IMinMax } from "~/types";

export interface ICubeGenerator {
  cubesLimits: IMinMax;
  sizeLimits: IMinMax;
  movementRange: IMinMax;
  rotationRange: IMinMax;
  roundnessLimits: IMinMax;
  screenLimitations: IMinMax;
  animationLimitations: IMinMax;
}
