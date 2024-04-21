import { FC, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

import { navItemStyles } from "./styles";

interface IProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  Icon: FC;
}

const NavbarItem: FC<IProps> = ({ onClick, Icon }) => {
  const classes = twMerge(...navItemStyles);

  return (
    <div className={classes} onClick={onClick}>
      <Icon />
    </div>
  );
};

export default NavbarItem;
