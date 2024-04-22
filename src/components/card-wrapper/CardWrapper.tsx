import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { cardDefaultStyle } from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardWrapper: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(classNames(cardDefaultStyle, other.className));

  return <div {...other} className={classes}>{children}</div>;
};

export default CardWrapper;
