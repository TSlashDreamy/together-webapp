import { FC } from "react";

import ContentCard from "~/components/content-card";
import CardWrapper from "~/components/card-wrapper";
import Typography from "~/components/typography";

import { usePlayer } from "~/hooks/usePlayer";

import { ISpotifyTrack } from "~/types";
import * as S from "./styles";

interface IProps {
  queue: ISpotifyTrack[];
}

const QueueView: FC<IProps> = ({ queue }) => {
  const { skip } = usePlayer();

  return (
    <div className={S.contentWrapper}>
      {queue && queue.length > 0 ? (
        queue.map((item, index) => <ContentCard track={item} onButtonClick={() => skip(index)} />)
      ) : (
        <CardWrapper>
          <Typography.SPAN>Your queue looks empty</Typography.SPAN>
        </CardWrapper>
      )}
    </div>
  );
};

export default QueueView;
