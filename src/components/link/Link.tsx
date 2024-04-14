import { FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

import { linkStyles } from "./styles";
import { twMerge } from "tailwind-merge";

interface IProps {
  children: ReactNode;
  to: string;
}

const Link: FC<IProps> = ({ children, to }) => {
  const classes = twMerge(...linkStyles);

  return (
    <RouterLink className={classes} to={to}>
      {children}
    </RouterLink>
  );
};

export default Link;
