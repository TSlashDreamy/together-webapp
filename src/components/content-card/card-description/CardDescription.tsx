import { FC } from "react";
import { IconType } from "react-icons";

import CardService from "./card-service";
import CardName from "./card-name";
import CardActions from "./card-actions";

import * as S from "./styles";
import { ISpotifyTrack } from "~/types";

interface IProps {
  track: ISpotifyTrack;
  onButtonClick: (track: ISpotifyTrack) => void;
  ButtonIcon?: IconType | FC;
  isLoading?: boolean;
}

const CardDescription: FC<IProps> = ({ track, onButtonClick, ButtonIcon, isLoading }) => {
  const convertDuration = (duration: number) => {
    const seconds = String(Math.floor((duration / 1000) % 60));
    const minutes = String(Math.floor((duration / (1000 * 60)) % 60));

    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  return (
    <div className={S.wrapperStyle}>
      <div className={S.hiddenWrapperStyle}>
        <CardService service={"Spotify"} />
        <hr className={S.hiddenDividerStyle} />
        <CardName name={track.name} length={convertDuration(track.duration)} />
      </div>
      <hr className={S.dividerStyle} />
      <CardActions author={track.author} contentType="Music" onPlay={() => onButtonClick(track)} ButtonIcon={ButtonIcon} isLoading={isLoading} />
    </div>
  );
};

export default CardDescription;
