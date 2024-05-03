import { FC } from "react";
import { IconType } from "react-icons";

import CardWrapper from "~/components/card-wrapper";
import Typography from "~/components/typography";

import * as S from "./styles";

interface IProps {
  Icon: FC | IconType;
  title: string;
  description: string;
}

const MessageCard: FC<IProps> = ({ Icon, title, description }) => {
  return (
    <CardWrapper className={S.wrapper}>
      <div>
        <Icon className={S.icon} />
      </div>
      <div>
        <Typography.H2>{title}</Typography.H2>
      </div>
      <div>
        <Typography.SPAN>{description}</Typography.SPAN>
      </div>
    </CardWrapper>
  );
};

export default MessageCard;
