import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { landingWrapperStyle } from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const LandingWrapper: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(classNames(other.className, landingWrapperStyle));

  return <div className={classes}>{children}</div>;
};

export default LandingWrapper;
