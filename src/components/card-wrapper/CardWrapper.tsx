import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardWrapper: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(
    classNames(
      "flex flex-col items-center content-center px-10 py-[60px] gap-[30px] bg-semitransparent-dark border-[1px] border-border-color rounded-[20px]",
      other.className,
    )
  );

  return <div className={classes}>{children}</div>;
};

export default CardWrapper;
