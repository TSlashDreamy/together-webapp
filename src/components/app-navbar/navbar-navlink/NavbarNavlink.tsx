import { FC } from "react";
import { NavLink } from "react-router-dom";

import IndicatorCounter from "~/components/indicator-counter";

import { NotificationCounterType } from "~/constants";
import { activeStyle, navLinkStyles } from "./styles";

interface IProps {
  Icon: FC;
  to: string;
  notificationCounter?: { amount: number; type: NotificationCounterType };
}

const NavbarNavlink: FC<IProps> = ({ Icon, to, notificationCounter }) => {
  return (
    <NavLink className={({ isActive }) => navLinkStyles.join(" ").concat(" ", isActive ? activeStyle : "")} to={to} end>
      <Icon />
      {notificationCounter && <IndicatorCounter amount={notificationCounter.amount} type={notificationCounter.type} />}
    </NavLink>
  );
};

export default NavbarNavlink;
