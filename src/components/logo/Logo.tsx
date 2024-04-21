import { FC, HTMLAttributes } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { logoStyle } from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  hidden?: boolean;
  onlyLogo?: boolean;
}

const Logo: FC<IProps> = ({ hidden, onlyLogo, ...other }) => {
  const classes = twMerge(
    classNames(logoStyle, other.className, {
      "opacity-0": hidden,
    })
  );

  return (
    <div className={classes}>
      {/* //! TEMP LOGO */}
      <div className="size-10 border-2 rounded-[10px]" />
      {!onlyLogo && "together"}
    </div>
  );
};

export default Logo;
