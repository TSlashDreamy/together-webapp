import classNames from "classnames";
import { FC, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { dividerStyle, lineStyle } from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Divider: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(
    classNames(dividerStyle, other.className, {
      "gap-[20px]": Boolean(children),
    })
  );
  return (
    <div className={classes}>
      <hr className={lineStyle} />
      {children}
      <hr className={lineStyle} />
    </div>
  );
};

export default Divider;
