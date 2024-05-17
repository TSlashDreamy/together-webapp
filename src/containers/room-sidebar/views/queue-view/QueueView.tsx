import { FC } from "react";

import ContentCard from "~/components/content-card";
import CardWrapper from "~/components/card-wrapper";
import Typography from "~/components/typography";

import { ISpotifyTrack } from "~/types";
import * as S from "./styles";

interface IProps {
  queue: ISpotifyTrack[];
}

const QueueView: FC<IProps> = ({ queue }) => {
  return (
    <div className={S.contentWrapper}>
      {queue && queue.length > 0 ? (
        queue.map((item) => <ContentCard track={item} onButtonClick={() => null} />)
      ) : (
        <CardWrapper>
          <Typography.SPAN>Add something</Typography.SPAN>
        </CardWrapper>
      )}
    </div>
  );
};

export default QueueView;
