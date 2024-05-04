import { FC } from "react";

import ContentCard from "~/components/content-card";
import CardWrapper from "~/components/card-wrapper";
import Typography from "~/components/typography";

import * as S from "./styles";

interface IProps {
  queue: string[];
}

const QueueView: FC<IProps> = ({ queue }) => {
  return (
    <div className={S.contentWrapper}>
      {queue ? (
        queue.map(() => <ContentCard />)
      ) : (
        <CardWrapper>
          <Typography.SPAN>Add something</Typography.SPAN>
        </CardWrapper>
      )}
    </div>
  );
};

export default QueueView;
