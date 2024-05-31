import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";
import { BsPersonFill as AuthorIcon } from "react-icons/bs";
import { FaClock as DurationIcon } from "react-icons/fa";
import { IoAddOutline as AddIcon } from "react-icons/io5";

import IconButton from "~/components/icon-button";
import Typography from "~/components/typography";

import { useUser } from "~/hooks/useUser";
import { usePlayer } from "~/hooks/usePlayer";

import { formatMs } from "~/utils";
import MusicIcon from "~/assets/icons/content-icons/music.svg?react";
import { ISpotifyTrack } from "~/types";
import * as S from "./styles";

interface IProps {
  track: ISpotifyTrack;
  showAlert?: () => void;
}

const ContentItem: FC<IProps> = ({ track, showAlert }) => {
  const classes = twMerge(S.wrapperStyles);
  const { roomId } = useUser();
  const { addToQueue, isLoading } = usePlayer();

  const handleAddToQueue = (track: ISpotifyTrack) => {
    if (!roomId && showAlert) showAlert();
    else addToQueue(track);
  };

  return (
    <div className={classes}>
      <div className={S.contentMainWrapper}>
        <img src={track.image} className={S.image} />
        <div className={S.textsWrapper}>
          <Typography.SPAN className={S.name}>{track.name}</Typography.SPAN>
          <div className={S.iconText}>
            <SpotifyIcon className={S.icon} />
            <Typography.SPAN className={S.text}>Spotify</Typography.SPAN>
          </div>
          <div className={S.iconText}>
            <MusicIcon className={S.icon} />
            <Typography.SPAN className={S.text}>Music</Typography.SPAN>
          </div>
        </div>
      </div>
      <div className={S.additionalInfo}>
        <AuthorIcon className={S.icon} />
        <Typography.SPAN className={S.text}>{track.author}</Typography.SPAN>
      </div>
      <div className={S.additionalInfo}>
        <DurationIcon className={S.icon} />
        <Typography.SPAN className={S.text}>{formatMs(track.duration)}</Typography.SPAN>
      </div>
      <IconButton Icon={AddIcon} isLoading={isLoading} onClick={() => handleAddToQueue(track)} />
    </div>
  );
};

export default ContentItem;
