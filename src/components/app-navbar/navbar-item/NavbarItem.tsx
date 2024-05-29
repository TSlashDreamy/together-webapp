import { FC, HTMLAttributes, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import IndicatorCounter from "~/components/indicator-counter";

import { NotificationCounterType } from "~/constants";
import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  Icon: FC;
  isActive?: boolean;
  notificationCounter?: { amount: number; type: NotificationCounterType };
}

const NavbarItem: FC<IProps> = ({ onClick, Icon, isActive, notificationCounter, ...other }) => {
  const classes = twMerge(
    classNames(...S.navItemStyles, other.className, {
      [S.activeStyle]: isActive,
    })
  );

  return (
    <div className={classes} onClick={onClick}>
      <Icon />
      {notificationCounter && <IndicatorCounter amount={notificationCounter.amount} type={notificationCounter.type} />}
    </div>
  );
};

export default NavbarItem;
