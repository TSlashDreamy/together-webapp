import { FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

import { linkStyles } from "./styles";
import { twMerge } from "tailwind-merge";

interface IProps {
  children: ReactNode;
  to: string;
  replace?: boolean;
}

const Link: FC<IProps> = ({ children, to, replace }) => {
  const classes = twMerge(...linkStyles);

  return (
    <RouterLink className={classes} to={replace ? `/${to}` : to}>
      {children}
    </RouterLink>
  );
};

export default Link;
