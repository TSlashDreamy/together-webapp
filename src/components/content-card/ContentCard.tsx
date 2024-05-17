import { FC } from "react";

import CardDescription from "./card-description";
import { cardStyle } from "./styles";
import { ISpotifyTrack } from "~/types";

interface IProps {
  track: ISpotifyTrack;
  onButtonClick: (track: ISpotifyTrack) => void;
}

const ContentCard: FC<IProps> = ({ track, onButtonClick }) => {
  return (
    <div className={cardStyle} style={{ backgroundImage: `url('${track.image}')` }}>
      <CardDescription track={track} onButtonClick={onButtonClick} />
    </div>
  );
};

export default ContentCard;
