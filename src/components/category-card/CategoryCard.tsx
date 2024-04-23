import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";

import Typography from "~/components/typography";
import IconButton from "~/components/icon-button";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  Icon: FC | IconType;
  cardNum: number;
  description: string;
  borderStyle: string;
  bgStyle: string;
  disabled?: boolean;
}

const CategoryCard: FC<IProps> = ({ Icon, cardNum, description, borderStyle, bgStyle, disabled, ...other }) => {
  const classes = twMerge(
    classNames(S.cardStyles, borderStyle, bgStyle, other.className, {
      [S.disabledStyle]: disabled,
    })
  );

  const formatNumber = (num: number) => {
    return num < 9 ? `0${num}` : num;
  };

  const autoScroll = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <div onMouseEnter={autoScroll} className={classes}>
      <Icon className={S.iconStyle} />
      <div className={S.contentWrapperStyle}>
        <Typography.SPAN className={S.numberStyle}>{formatNumber(cardNum)}.</Typography.SPAN>
        <div className={S.descriptionWrapperStyle}>
          <Typography.H3 className={S.headingStyle}>{description}</Typography.H3>
          <IconButton className={S.iconButtonStyle} disabled={disabled} Icon={ArrowIcon} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
