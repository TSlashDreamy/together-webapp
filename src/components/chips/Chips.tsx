import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  Icon: FC | IconType;
  isActive: boolean;
  onClick: () => void;
}

const Chips: FC<IProps> = ({ Icon, isActive, onClick }) => {
  const classes = twMerge(
    classNames(S.chipsStyles, {
      [S.activeChips]: isActive,
    })
  );
  const iconClass = twMerge(classNames(S.icon, { "fill-text-light": isActive }));

  return (
    <div className={classes} onClick={onClick}>
      <Icon className={iconClass} />
    </div>
  );
};

export default Chips;
