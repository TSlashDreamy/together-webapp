import classNames from "classnames";
import { FC, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { dividerStyle, lineStyle } from "./styles";
import Typography from "../typography";

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
      <Typography.SPAN>{children}</Typography.SPAN>
      <hr className={lineStyle} />
    </div>
  );
};

export default Divider;
