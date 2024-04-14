import { getRandomNum } from "~/utils";
import { ICubeGenerator } from "./types";
import { IMinMax } from "~/types";

const createKeyframeAnimation = (
  num: number,
  movementRange: IMinMax,
  rotationRange: IMinMax,
  timeLimits: IMinMax
) => {
  const animatorConfig = {
    animName: `cubeAnimation${num}`,
    movement: getRandomNum(movementRange.min, movementRange.max),
    rotation: getRandomNum(rotationRange.min, rotationRange.max),
    time: getRandomNum(timeLimits.min, timeLimits.max),
  };
  const styleSheet = document.createElement("style");

  document.head.appendChild(styleSheet);

  const animationRule = `
  @keyframes ${animatorConfig.animName} { 
    0% { transform: translateY(0px) rotate(${animatorConfig.rotation}deg); }
    50% { transform: translateY(${animatorConfig.movement}px) rotate(${animatorConfig.rotation}deg); }
    100% { transform: translateY(0px) rotate(${animatorConfig.rotation}deg); }
  }`;

  styleSheet.textContent = animationRule;
  return `${animatorConfig.animName} ${animatorConfig.time}s ease-in-out infinite`;
};

export const generateRandomCubes = (generatorConfig: ICubeGenerator, texture: string) => {
  const {
    sizeLimits,
    cubesLimits,
    movementRange,
    rotationRange,
    roundnessLimits,
    screenLimitations,
    animationLimitations,
  } = generatorConfig;
  const cubesLength = getRandomNum(cubesLimits.min, cubesLimits.max);

  return Array.from({ length: cubesLength }, () => {
    const currentConfig = {
      animation: createKeyframeAnimation(
        getRandomNum(1, 100),
        movementRange,
        rotationRange,
        animationLimitations
      ),
      cubePos: {
        x: getRandomNum(screenLimitations.min, screenLimitations.max),
        y: getRandomNum(screenLimitations.min, screenLimitations.max),
      },
      size: getRandomNum(sizeLimits.min, sizeLimits.max),
      round: getRandomNum(roundnessLimits.min, roundnessLimits.max),
    };

    return (
      <div
        className={`${texture} animate-[${currentConfig.animation}]`}
        style={{
          width: `${currentConfig.size}vw`,
          height: `${currentConfig.size}vw`,
          right: `${currentConfig.cubePos.x}vw`,
          bottom: `${currentConfig.cubePos.y}vh`,
          borderRadius: `${currentConfig.round}px`,
          animation: currentConfig.animation,
        }}
      />
    );
  });
};
