import { FC } from "react";
import { NavLink } from "react-router-dom";

import { activeStyle, navLinkStyles } from "./styles";

interface IProps {
  Icon: FC;
  to: string;
}

const NavbarNavlink: FC<IProps> = ({ Icon, to }) => {
  return (
    <NavLink className={({ isActive }) => navLinkStyles.join(" ").concat(" ", isActive ? activeStyle : "")} to={to} end>
      <Icon />
    </NavLink>
  );
};

export default NavbarNavlink;
