import { FC } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import Typography from "~/components/typography";
import PlayerLeftSide from "./player-left-side";
import PlayerRightSide from "./player-right-side";

import { usePlayer } from "~/hooks/usePlayer";

import * as S from "./styles";

const MusicPlayer: FC = () => {
  const { isPlaying, isLoading, nowPlaying, next, currentDuration, volume, togglePlay, skip, seek, changeVolume } =
    usePlayer();

  const classes = twMerge(
    classNames(S.player, {
      [S.hidden]: !nowPlaying,
    })
  );
  const hintClasses = twMerge(
    classNames(S.hint, {
      [S.hidden]: nowPlaying,
    })
  );

  return (
    <div className={S.wrapperStyle}>
      <Typography.H3 className={hintClasses}>Add something to your room to start the party! 🎉</Typography.H3>
      <div className={classes}>
        <PlayerLeftSide
          currentTrack={nowPlaying}
          isPlaying={isPlaying}
          isLoading={isLoading}
          next={next}
          currentDuration={currentDuration}
          volume={volume}
          togglePlay={togglePlay}
          skip={skip}
          seek={seek}
          changeVolume={changeVolume}
        />
        <PlayerRightSide currentTrack={nowPlaying} nextTrack={next} currentDuration={currentDuration} />
      </div>
    </div>
  );
};

export default MusicPlayer;
