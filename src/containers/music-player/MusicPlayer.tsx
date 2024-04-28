import { FC } from "react";

import * as S from "./styles";
import PlayerLeftSide from "./player-left-side";
import PlayerRightSide from "./player-right-side";

const MusicPlayer: FC = () => {
  return (
    <div className={S.wrapperStyle}>
      <PlayerLeftSide />
      <PlayerRightSide />
    </div>
  );
};

export default MusicPlayer;
