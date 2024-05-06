import { FC, HTMLAttributes } from "react";
import { IconType } from "react-icons";

import CardWrapper from "~/components/card-wrapper";
import Typography from "~/components/typography";

import * as S from "./styles";
import { twMerge } from "tailwind-merge";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  Icon: FC | IconType;
  title: string;
  description: string;
  iconStyle?: string;
}

const MessageCard: FC<IProps> = ({ Icon, title, description, iconStyle, ...other }) => {
  const classes = twMerge(S.wrapper, other.className);
  const iconClasses = twMerge(S.icon, iconStyle);

  return (
    <CardWrapper className={classes}>
      <div>
        <Icon className={iconClasses} />
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
