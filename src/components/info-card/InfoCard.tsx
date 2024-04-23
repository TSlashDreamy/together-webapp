import { FC, HTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import Button from "~/components/button";
import Typography from "~/components/typography";

import * as S from "./styles";

interface ICard {
  Icon?: FC | IconType;
  name: string;
  description: string;
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  card: ICard;
  actionBtn?: { action: () => void; name: string; disabled?: boolean };
}

const InfoCard: FC<IProps> = ({ card, actionBtn, ...other }) => {
  const { Icon, name, description } = card;
  const classes = twMerge(S.wrapperStyles, other.className);

  return (
    <div {...other} className={classes}>
      <div className={S.titleStyle}>
        {Icon && <Icon className={S.iconStyle} />}
        <Typography.H3 className={S.headingStyle}>{name}</Typography.H3>
      </div>
      <div>
        <Typography.SPAN className={S.spanStyle}>{description}</Typography.SPAN>
      </div>
      {actionBtn && (
        <Button secondary outline medium disabled={actionBtn.disabled} onClick={actionBtn.action}>
          {actionBtn.name}
        </Button>
      )}
    </div>
  );
};

export default InfoCard;
