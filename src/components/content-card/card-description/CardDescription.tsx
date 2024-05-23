import { FC } from "react";
import { IconType } from "react-icons";

import CardService from "./card-service";
import CardName from "./card-name";
import CardActions from "./card-actions";

import { formatMs } from "~/utils";
import { ISpotifyTrack } from "~/types";
import * as S from "./styles";

interface IProps {
  track: ISpotifyTrack;
  onButtonClick: (track: ISpotifyTrack) => void;
  ButtonIcon?: IconType | FC;
  isLoading?: boolean;
}

const CardDescription: FC<IProps> = ({ track, onButtonClick, ButtonIcon, isLoading }) => {
  return (
    <div className={S.wrapperStyle}>
      <div className={S.hiddenWrapperStyle}>
        <CardService service={"Spotify"} />
        <hr className={S.hiddenDividerStyle} />
        <CardName name={track.name} length={formatMs(track.duration)} />
      </div>
      <hr className={S.dividerStyle} />
      <CardActions author={track.author} contentType="Music" onPlay={() => onButtonClick(track)} ButtonIcon={ButtonIcon} isLoading={isLoading} />
    </div>
  );
};

export default CardDescription;
