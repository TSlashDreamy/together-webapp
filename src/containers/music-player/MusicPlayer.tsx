import { FC } from "react";

import PlayerLeftSide from "./player-left-side";
import PlayerRightSide from "./player-right-side";

import * as S from "./styles";

const MusicPlayer: FC = () => {
  return (
    <div className={S.wrapperStyle}>
      <PlayerLeftSide />
      <PlayerRightSide />
    </div>
  );
};

export default MusicPlayer;
