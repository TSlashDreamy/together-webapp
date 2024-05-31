import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaPause as PauseIcon } from "react-icons/fa6";
import { PiNotchesLight as NoContentIcon } from "react-icons/pi";

import IconButton from "~/components/icon-button";
import RangeSlider from "~/components/range-slider";

import LikeIcon from "~/assets/icons/etc-icons/heart.svg?react";
import PlayIcon from "~/assets/icons/etc-icons/play.svg?react";
import VolumeIcon from "~/assets/icons/etc-icons/volume.svg?react";
import AddCollectionIcon from "~/assets/icons/etc-icons/addCollection.svg?react";
import SkipIcon from "~/assets/icons/etc-icons/skip.svg?react";

import { ISpotifyTrack } from "~/types";
import * as S from "./styles";

interface IProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentTrack: ISpotifyTrack | null;
  next: ISpotifyTrack | null;
  currentDuration: number | null;
  volume: number | null;
  togglePlay: () => Promise<void>;
  skip: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
  changeVolume: (volume: number) => Promise<void>;
  like: (track: ISpotifyTrack) => Promise<void>;
}

const PlayerLeftSide: FC<IProps> = ({
  isPlaying,
  isLoading,
  currentTrack,
  next,
  currentDuration,
  volume,
  togglePlay,
  skip,
  seek,
  changeVolume,
  like,
}) => {
  const [volumeShown, setVolumeShown] = useState(false);
  const iconClasses = twMerge(S.musicCoverStyle, "text-text-white");

  const handleLike = async () => {
    if (!currentTrack) return;
    await like(currentTrack);
  };

  return (
    <>
      <div className={S.leftSideStyle}>
        {currentTrack?.image ? <img className={S.musicCoverStyle} src={currentTrack?.image} /> : <NoContentIcon className={iconClasses} />}
        <div className={S.buttonsContainerStyle}>
          <div className={S.buttonsWrapperStyle}>
            <IconButton Icon={isPlaying ? PauseIcon : PlayIcon} isLoading={isLoading} onClick={() => togglePlay()} />
            <IconButton Icon={SkipIcon} withoutOutline disabled={!next} onClick={() => skip()} />
            <div className={S.volumeWrapper}>
              <IconButton Icon={VolumeIcon} withoutOutline onClick={() => setVolumeShown((state) => !state)} />
              {volumeShown && <RangeSlider onChange={changeVolume} min={0} max={100} value={volume as number} />}
            </div>
          </div>
          <div className={S.buttonsWrapperStyle}>
            <IconButton Icon={AddCollectionIcon} disabled />
            <IconButton Icon={LikeIcon} onClick={handleLike} />
          </div>
        </div>
        <RangeSlider onChange={seek} min={0} max={(currentTrack?.duration as number) || 100} value={currentDuration as number} />
      </div>
    </>
  );
};

export default PlayerLeftSide;
