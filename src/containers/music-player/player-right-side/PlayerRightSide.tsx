import { FC } from "react";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";

import Typography from "~/components/typography";
import NextBlock from "./next-block";

import { ISpotifyTrack } from "~/types";
import { formatMs } from "~/utils";
import * as S from "./styles";

interface IProps {
  currentTrack: ISpotifyTrack | null;
  nextTrack: ISpotifyTrack | null;
  currentDuration: number | null;
}

const PlayerRightSide: FC<IProps> = ({ currentTrack, nextTrack, currentDuration }) => {
  return (
    <div className={S.rightSideStyle}>
      <div className={S.serviceWrapper}>
        <Typography.SPAN>Playing from</Typography.SPAN>
        <SpotifyIcon className={S.serviceIconStyle} />
      </div>
      {currentTrack ? (
        <div className={S.songDetailsStyle}>
          <div>
            <Typography.H3 className="font-medium">{currentTrack.name}</Typography.H3>
            <Typography.SPAN>{currentTrack.author}</Typography.SPAN>
          </div>
          <Typography.H3 className="font-medium">
            {formatMs(currentDuration || 0)} / {formatMs(currentTrack.duration)}
          </Typography.H3>
        </div>
      ) : (
        <Typography.H3 className="font-medium">Nothing is playing now</Typography.H3>
      )}
      {nextTrack && (
        <NextBlock
          currentDuration={currentDuration || 0}
          trackName={nextTrack.name}
          trackLength={(currentTrack?.duration as number) || 0}
        />
      )}
      <Typography.SPAN className={S.requestedTextStyle}>
        Requested by: {currentTrack?.requestedBy || "Unknown"}
      </Typography.SPAN>
    </div>
  );
};

export default PlayerRightSide;
