import { FC, HTMLAttributes, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

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
  const notificationClasses = twMerge(
    classNames(S.notification, {
      [S.notificationAction]: notificationCounter?.type === NotificationCounterType.ACTION,
      [S.notificationAttention]: notificationCounter?.type === NotificationCounterType.ATTENTION,
      [S.notificationNeutral]: notificationCounter?.type === NotificationCounterType.NEUTRAL,
    })
  );

  return (
    <div className={classes} onClick={onClick}>
      <Icon />
      {notificationCounter && <div className={notificationClasses}>{notificationCounter.amount}</div>}
    </div>
  );
};

export default NavbarItem;
