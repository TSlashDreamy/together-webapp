import { FC, memo } from "react";

import { generateRandomCubes } from "./utils";
import { cubesGeneratorConfig, defaultCubesPreset } from "./constants";
import * as S from "./styles";

interface IProps {
  randomize?: boolean;
}

const Cubes: FC<IProps> = ({ randomize }) => {
  return (
    <div className={S.cubesWrapperStyle}>
      {randomize
        ? generateRandomCubes(cubesGeneratorConfig, S.textureClasses)
        : defaultCubesPreset.map((cubeClasses) => (
            <div key={cubeClasses} className={`${S.textureClasses} ${cubeClasses}`} />
          ))}
    </div>
  );
};

const MemoizedCubes = memo(Cubes);

export default MemoizedCubes;
