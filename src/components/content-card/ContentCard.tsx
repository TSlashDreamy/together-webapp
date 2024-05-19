import { FC } from "react";

import CardDescription from "./card-description";
import { cardStyle } from "./styles";
import { ISpotifyTrack } from "~/types";
import { IconType } from "react-icons";

interface IProps {
  track: ISpotifyTrack;
  onButtonClick: (track: ISpotifyTrack) => void;
  ButtonIcon?: IconType | FC;
  isLoading?: boolean;
}

const ContentCard: FC<IProps> = ({ track, onButtonClick, ButtonIcon, isLoading }) => {
  return (
    <div className={cardStyle} style={{ backgroundImage: `url('${track.image}')` }}>
      <CardDescription track={track} onButtonClick={onButtonClick} ButtonIcon={ButtonIcon} isLoading={isLoading} />
    </div>
  );
};

export default ContentCard;
