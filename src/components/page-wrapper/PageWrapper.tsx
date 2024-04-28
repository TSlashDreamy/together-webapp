import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { wrapperStyle } from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const PageWrapper: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(wrapperStyle, other.className);
  
  return <div className={classes}>{children}</div>;
};

export default PageWrapper;
