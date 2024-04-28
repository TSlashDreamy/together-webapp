import { FC, HTMLAttributes, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

import { activeStyle, navItemStyles } from "./styles";
import classNames from "classnames";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  Icon: FC;
  isActive?: boolean;
}

const NavbarItem: FC<IProps> = ({ onClick, Icon, isActive, ...other }) => {
  const classes = twMerge(
    classNames(...navItemStyles, other.className, {
      [activeStyle]: isActive,
    })
  );

  return (
    <div className={classes} onClick={onClick}>
      <Icon />
    </div>
  );
};

export default NavbarItem;
