import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  Icon: FC | IconType;
  isActive: boolean;
}

const Chips: FC<IProps> = ({ Icon, isActive }) => {
  const classes = twMerge(
    classNames(S.chips, {
      [S.activeChips]: isActive,
    })
  );
  const iconClass = twMerge(classNames(S.icon, { "fill-text-light": isActive }));

  return (
    <div className={classes}>
      <Icon className={iconClass} />
    </div>
  );
};

export default Chips;
