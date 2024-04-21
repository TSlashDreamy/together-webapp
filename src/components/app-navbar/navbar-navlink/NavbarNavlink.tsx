import { FC } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  Icon: FC;
  to: string;
}

const NavbarNavlink: FC<IProps> = ({ Icon, to }) => {
  const classes =
    "relative after:opacity-0 after:absolute after:left-1/2 after:h-1 after:mt-2 after:w-1/4 after:bg-primary after:rounded-xl after:translate-x-[-50%] hover:after:w-1/2 hover:after:opacity-100 hover:after:h-[1px] hover:fill-primary after:hover:bg-text-light after:transition-all";

  return (
    <NavLink
      className={({ isActive }) => classes.concat(isActive ? " after:opacity-100 after:w-1/4" : "")}
      to={to}
      end
    >
      <Icon />
    </NavLink>
  );
};

export default NavbarNavlink;
