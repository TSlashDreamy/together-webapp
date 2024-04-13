import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const LandingWrapper: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(
    classNames(other.className, "flex items-center content-start w-[100vw] h-[100vh] p-[50px]")
  );

  return <div className={classes}>{children}</div>;
};

export default LandingWrapper;
