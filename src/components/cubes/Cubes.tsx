import { FC, memo } from "react";

import { generateRandomCubes } from "./utils";
import { cubesGeneratorConfig, defaultCubesPreset } from "./constants";
import * as S from "./styles";
import { useConfig } from "~/hooks/useConfig";

interface IProps {
  randomize?: boolean;
}

const Cubes: FC<IProps> = ({ randomize }) => {
  const { appearance } = useConfig();

  return (
    <div style={{ opacity: appearance.floatingObjects ? '1' : randomize ? '0' : '1' }} className={S.cubesWrapperStyle}>
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
